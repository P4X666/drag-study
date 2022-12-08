// npx tailwindcss init -p 生成配置文件
/** 
 * @type {import('tailwindcss').Config}
 *  */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // https://daisyui.com/docs/config/
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "tw_",
    darkTheme: "dark",
  },
}
