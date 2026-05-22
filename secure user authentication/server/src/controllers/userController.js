import User from '../models/User.js';

export const getAdminStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const admins = await User.countDocuments({ role: 'admin' });
  res.json({
    message: 'Admin dashboard data',
    totalUsers,
    admins,
    regularUsers: totalUsers - admins,
  });
};
