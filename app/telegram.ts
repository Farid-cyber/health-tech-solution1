import { SessionData, Telegraf, session } from "telegraf";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase/firebase.con";
import { message } from "telegraf/filters";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

// ENABLE SESSION
bot.use(session());

// --- START COMMAND ---
bot.start((ctx) => {
  ctx.reply("Welcome to Health Tech Solution!", {
    reply_markup: {
      keyboard: [
        [{ text: "🏥 Visit Website" }],
        [{ text: "🩺 Book Consultation" }],
      ],
      resize_keyboard: true,
    },
  });
});

// --- MENU OPEN WEBSITE ---
bot.hears("🏥 Visit Website", (ctx) => {
  ctx.reply("Opening main page…", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go to Website", url: "https://yourwebsite.com" }],
      ],
    },
  });
});

// --- BOOK CONSULTATION ---
bot.hears("🩺 Book Consultation", (ctx) => {
  ctx.session = {} as SessionData;
  ctx.reply("Select issue type:", {
    reply_markup: {
      keyboard: [
        ["urologiya", "Jarrohlik onkologiyasi"],
        ["Onco-ophthalmologis", "Ophthalmologist"],
        ["Cancel"],
      ],
      resize_keyboard: true,
    },
  });
});

// --- CATEGORY SELECTED ---
bot.hears(
  ["Cardiologist", "Dentist", "Dermatologist", "Neurologist"],
  async (ctx) => {
    const job = ctx.message.text;
    ctx.session.job = job; // store job instead of category

    // Fetch doctors with that job
    const q = query(collection(db, "doctors"), where("job", "==", job));
    const docs = await getDocs(q);

    if (docs.empty) {
      return ctx.reply("❌ No doctors available for this job.");
    }

    // Build inline keyboard (typed)
    const keyboard: { text: string; callback_data: string }[][] = [];

    docs.forEach((doc) => {
      keyboard.push([
        { text: doc.data().name, callback_data: `doctor_${doc.id}` },
      ]);
    });

    ctx.reply("Choose doctor:", {
      reply_markup: { inline_keyboard: keyboard },
    });
  }
);

// --- DOCTOR SELECTED ---
bot.action(/doctor_(.+)/, async (ctx) => {
  const doctorId = ctx.match[1];
  const docRef = doc(db, "doctors", doctorId);
  const doctorSnap = await getDoc(docRef);

  if (!doctorSnap.exists()) return ctx.reply("❌ Doctor not found.");

  const doctorData = doctorSnap.data();

  // store email & name instead of ID
  ctx.session.doctor_email = doctorData.email;
  ctx.session.doctor_name = doctorData.name;

  await ctx.reply("Enter your full name:");
  ctx.session.step = "name";
});

// --- COLLECT NAME / PHONE / DESCRIPTION ---
bot.on(message("text"), async (ctx) => {
  if (ctx.session?.step === "name") {
    ctx.session.user_name = ctx.message.text;
    ctx.session.step = "phone";
    return ctx.reply("Enter your phone number:");
  }

  if (ctx.session?.step === "phone") {
    ctx.session.phone = ctx.message.text;
    ctx.session.step = "desc";
    return ctx.reply("Describe your issue:");
  }

  if (ctx.session?.step === "desc") {
    await addDoc(collection(db, "consultations"), {
      doctor_email: ctx.session.doctor_email,
      user_name: ctx.session.user_name,
      phone: ctx.session.phone,
      issue_type: ctx.session.issue_type,
      issue_description: ctx.message.text,
      created_at: serverTimestamp(),
    });

    ctx.reply("✅ So'rov yuborildi!");
    ctx.session = {} as SessionData;
  }
});

export default bot;
