/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      container: {
          center: true,
          padding: "15px",
          screens: {
              sm: "640px",
              md: "768px",
              lg: "960px",
              xl: "1200px",
          },
      },
      extend: {
          borderRadius: {
              lg: 'var(--radius)',
              md: 'calc(var(--radius) - 2px)',
              sm: 'calc(var(--radius) - 4px)',
          },
          colors: {
              primary: "var(--color-primary)",
              accent: {
                  DEFAULT: "var(--color-accent)",
                  hover: "var(--color-accent-hover)",
              },
          },
      },
  },
  plugins: [import("tailwindcss-animate")],
};
