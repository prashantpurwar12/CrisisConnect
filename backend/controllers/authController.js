const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');

// Configure Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// REGISTER (No changes needed here)
const register = async (req, res) => {
  try {
    const { fullname, email, phone, password, serviceLocations } = req.body;

    if (!fullname || !email || !phone || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!serviceLocations || !Array.isArray(serviceLocations) || serviceLocations.length === 0) {
      return res.status(400).json({ message: 'At least one location is required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      fullname,
      email,
      phone,
      password: hashed,
      serviceLocations
    });

    await user.save();

    return res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN (Updated with specific error messages)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

    const user = await User.findOne({ email });
    // CHANGE 1: Return a specific "user not found" message with a 404 status.
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const ok = await bcrypt.compare(password, user.password);
    // CHANGE 2: Return a specific "incorrect password" message with a 401 status.
    if (!ok) return res.status(401).json({ message: 'Incorrect password. Please try again.' });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        serviceLocations: user.serviceLocations
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// SEND OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send Email or Log to Console
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your CrisisConnect Login OTP',
        text: `Your OTP for login is: ${otp}. It expires in 10 minutes.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          // Fallback to console log if email fails
          console.log(`[DEV] OTP for ${email}: ${otp}`);
          return res.status(200).json({ message: 'OTP sent (email failed, check console)' });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ message: 'OTP sent to your email' });
        }
      });
    } else {
      console.log(`[DEV] OTP for ${email}: ${otp}`);
      return res.status(200).json({ message: 'OTP sent (check server console)' });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// VERIFY OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Clear OTP
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        serviceLocations: user.serviceLocations
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// EXPORT ALL FUNCTIONS
module.exports = { register, login, sendOtp, verifyOtp };