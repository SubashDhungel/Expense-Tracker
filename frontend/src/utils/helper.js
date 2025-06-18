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



export const prepareExpenseBarChartData = (data = []) => {
  const today = new Date();
  const chartData = [];

  // Step 1: Create last 30 days date list
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const label = `${day} ${month}`;
    chartData.push({ date: label, amount: 0 });
  }

  // Step 2: Sum actual transactions into matching day
  data.forEach((item) => {
    const itemDate = new Date(item.date);
    const day = itemDate.getDate().toString().padStart(2, "0");
    const month = itemDate.toLocaleString("default", { month: "short" });
    const label = `${day} ${month}`;

    const index = chartData.findIndex((entry) => entry.date === label);
    if (index !== -1) {
      chartData[index].amount += item.amount || 0;
    }
  });

  return chartData;
};

