export const hudTheme = {
	breakpoints: {
		compactWidth: 1220,
		phoneHeight: 500,
		phoneWidth: 860,
		ultraCompactWidth: 980,
	},
	colors: {
		background: Color3.fromRGB(58, 63, 92),
		buttonBlue: Color3.fromRGB(34, 168, 232),
		green: Color3.fromRGB(67, 176, 71),
		panel: Color3.fromRGB(42, 45, 74),
		progressBase: Color3.fromRGB(30, 32, 53),
		stroke: Color3.fromRGB(30, 32, 53),
		strokeBottom: Color3.fromRGB(20, 22, 40),
		textMuted: Color3.fromRGB(158, 158, 184),
		white: Color3.fromRGB(255, 255, 255),
		yellow: Color3.fromRGB(255, 228, 77),
	},
	layers: {
		base: 10,
		bottom: 40,
		center: 20,
		side: 30,
		toast: 60,
		tooltip: 80,
		top: 50,
	},
	radius: {
		lg: new UDim(0, 16),
		md: new UDim(0, 12),
		sm: new UDim(0, 8),
	},
};

export type HudTheme = typeof hudTheme;
