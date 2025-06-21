import Subscriber from '../models/Subscriber.js';
import transporter from '../configs/mailer.js';

export const sendNewsletter = async (blog) => {
  const subscribers = await Subscriber.find();
  if (!subscribers.length) return;

  const link = `${process.env.FRONTEND_URL}/blog/${blog._id}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    subject: `📰 New Blog Published: ${blog.title}`,
    html: `
      <h2>${blog.title}</h2>
      <p>${blog.subTitle || ''}</p>
      <p>${blog.description.substring(0, 200)}...</p>
      <a href="${link}" style="color: blue;">Read Full Blog</a>
    `
  };

  for (const sub of subscribers) {
    await transporter.sendMail({ ...mailOptions, to: sub.email });
  }
};
