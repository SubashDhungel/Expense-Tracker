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




// Amount based green color 
// Helper to interpolate between two colors
function interpolateColor(color1, color2, factor) {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return `rgb(${result.join(",")})`;
}

// Convert hex to RGB array
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map(x => x + x).join("");
  }
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Get color based on amount
export const getBarColor = (amount, min, max) => {
  const darkGreen = hexToRgb("#059669"); // Tailwind emerald-600
  const lightGreen = hexToRgb("#bbf7d0"); // Tailwind emerald-100
  // Normalize amount between 0 and 1
  const factor = max === min ? 1 : (amount - min) / (max - min);
  // Higher amount = more dark
  return interpolateColor(lightGreen, darkGreen, factor);
};

