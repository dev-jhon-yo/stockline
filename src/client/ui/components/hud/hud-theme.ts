export interface HudTypographyScale {
	body: number;
	caption: number;
	headline: number;
	title: number;
}

export interface HudThemeTokens {
	breakpoints: {
		compactWidth: number;
		phoneHeight: number;
		phoneWidth: number;
		shortHeight: number;
		ultraCompactWidth: number;
	};
	colors: {
		background: Color3;
		blue: Color3;
		glowBlue: Color3;
		glowGreen: Color3;
		green: Color3;
		mauve: Color3;
		red: Color3;
		stroke: Color3;
		strokeSoft: Color3;
		surface: Color3;
		surfaceMuted: Color3;
		surfaceStrong: Color3;
		textPrimary: Color3;
		textSecondary: Color3;
		yellow: Color3;
	};
	layers: {
		base: number;
		bottom: number;
		modal: number;
		overlay: number;
		side: number;
		toast: number;
		top: number;
		tooltip: number;
	};
	radius: {
		lg: UDim;
		md: UDim;
		pill: UDim;
		sm: UDim;
	};
	spacing: {
		lg: number;
		md: number;
		sm: number;
		xl: number;
		xs: number;
	};
	stroke: {
		heavy: number;
		regular: number;
		thin: number;
	};
	typography: HudTypographyScale;
}

export const hudTheme: HudThemeTokens = {
	breakpoints: {
		compactWidth: 1360,
		phoneHeight: 440,
		phoneWidth: 860,
		shortHeight: 520,
		ultraCompactWidth: 1080,
	},
	colors: {
		background: Color3.fromRGB(24, 24, 37),
		blue: Color3.fromRGB(137, 180, 250),
		glowBlue: Color3.fromRGB(137, 180, 250),
		glowGreen: Color3.fromRGB(166, 227, 161),
		green: Color3.fromRGB(166, 227, 161),
		mauve: Color3.fromRGB(203, 166, 247),
		red: Color3.fromRGB(243, 139, 168),
		stroke: Color3.fromRGB(88, 91, 112),
		strokeSoft: Color3.fromRGB(69, 71, 90),
		surface: Color3.fromRGB(49, 50, 68),
		surfaceMuted: Color3.fromRGB(30, 30, 46),
		surfaceStrong: Color3.fromRGB(69, 71, 90),
		textPrimary: Color3.fromRGB(205, 214, 244),
		textSecondary: Color3.fromRGB(166, 173, 200),
		yellow: Color3.fromRGB(249, 226, 175),
	},
	layers: {
		base: 10,
		bottom: 40,
		modal: 80,
		overlay: 50,
		side: 30,
		toast: 60,
		top: 20,
		tooltip: 90,
	},
	radius: {
		lg: new UDim(0, 16),
		md: new UDim(0, 12),
		pill: new UDim(0, 18),
		sm: new UDim(0, 8),
	},
	spacing: {
		lg: 18,
		md: 14,
		sm: 10,
		xl: 24,
		xs: 6,
	},
	stroke: {
		heavy: 2,
		regular: 1.5,
		thin: 1,
	},
	typography: {
		body: 18,
		caption: 14,
		headline: 36,
		title: 22,
	},
};
