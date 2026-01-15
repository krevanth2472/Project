
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
export const isPhone = (v) => /^\d{10,15}$/.test(v)
export const isPasswordStrong = (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(v)
export const isOtp = (v) => /^\d{6}$/.test(v)
