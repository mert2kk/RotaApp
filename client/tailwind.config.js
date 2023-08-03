/** @type {import('tailwindcss').Config} */
export default {
  important:true,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors: {
        'header': '#ADBDC6',
        'dashboard':'#BDCDD6',
        'card':'#EEE9DA',
        'habitdone':"#9FC5CB"
      },
      backgroundImage: {
        'signup': "url('/Users/mertkadirkayan/Desktop/Rota1/client/src/assets/SignUp.svg')",
      },
      fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif','Dancing Script','Open Sans'], 
      },
      
    },
  },
  plugins: [],
}

