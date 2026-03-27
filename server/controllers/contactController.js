import mongoose from "mongoose";
import Contact from "../models/Contact.js";

export async function submitContact(request, response) {
  const { name, email, company = "", message } = request.body;

  if (!name || !email || !message) {
    return response.status(400).json({
      message: "Please fill in your name, email, and message."
    });
  }

  if (mongoose.connection.readyState === 1) {
    await Contact.create({ name, email, company, message });

    return response.status(201).json({
      message: "Message sent successfully. I will get back to you soon."
    });
  }

  return response.status(200).json({
    message: "Message captured. Add MongoDB to persist submissions in production."
  });
}
