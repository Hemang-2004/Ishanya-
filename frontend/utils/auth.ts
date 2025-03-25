
export const setUserData = (userId: string, userName: string, role: string) => {
  if (typeof window !== "undefined") {
    console.log(userId, role)
    localStorage.setItem("user", JSON.stringify({ userId, userName,role }))
  }
}

export const getUserData = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user")
    console.log(userData)
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export const clearUserData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}
