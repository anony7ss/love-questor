
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				love: {
					DEFAULT: '#ff6b8b',
					light: '#ffb3c1',
					dark: '#cc4361',
				},
				cream: {
					DEFAULT: '#fff5f7',
					light: '#fffafc',
					dark: '#f8e6ea',
				},
				purple: {
					DEFAULT: '#8B5CF6',
					50: '#F3F0FD',
					100: '#EAE4FC',
					200: '#D7CBF9',
					300: '#C4B2F6',
					400: '#B199F3',
					500: '#9D7FF0',
					600: '#8B5CF6',
					700: '#6D35F2',
					800: '#4C0DE8',
					900: '#3A0AB4',
				},
				pink: {
					DEFAULT: '#EC4899',
					50: '#FCECF5',
					100: '#FAD9EC',
					200: '#F5B3D9',
					300: '#F18DC7',
					400: '#EC68B4',
					500: '#E74299',
					600: '#D61B7C',
					700: '#A31560',
					800: '#710E43',
					900: '#3E0825',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'heart-fall': {
					'0%': { 
						transform: 'translateY(-10vh) translateX(0) rotate(0deg)',
						opacity: '1'
					},
					'100%': { 
						transform: 'translateY(100vh) translateX(calc(var(--offset) * 1rem)) rotate(calc(var(--rotate) * 1deg))',
						opacity: '0.5'
					}
				},
				'fade-in': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse-scale': {
					'0%, 100%': { 
						transform: 'scale(1)' 
					},
					'50%': { 
						transform: 'scale(1.05)' 
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0)' 
					},
					'50%': { 
						transform: 'translateY(-10px)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'heart-fall': 'heart-fall 5s linear forwards',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
