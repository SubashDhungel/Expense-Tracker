export const isEmailValid=(email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

};
export const isPasswordValid=(password)=>{
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};
export const doPasswordsMatch=(password,confirmPassword)=>{
    return password === confirmPassword;
}


export const getInitials = (fullName) => {
  if (!fullName) return "";
  const words = fullName.split(" ");

  let initials = "";
  for (let i = 0; i < words.length; i++) {
    initials += words[i].charAt(0).toUpperCase();
  }
  return initials;
};

export function addThousandsSeperator(num) {
  if (typeof num !== 'number' && typeof num !== 'string') return '';
  num = Number(num);
  if (isNaN(num)) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const prepareExpenseBarChartData = (data=[]) => {
  const charData = data.map((item) => ({
    category: item?.category || "Uncategorized",
    amount: item?.amount || 0,

    }))
    return charData;
  }
