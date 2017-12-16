const logout = (req, res) => {
  req.username = undefined;
  res.json({success: true});
}

module.exports = {
  logout
};
