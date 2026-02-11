import { hudTheme } from "./hud-theme";

export interface ChipData {
	change: string;
	changeColor: Color3;
	icon: string;
	label: string;
	value: string;
}

export interface ObjectiveData {
	description: string;
	isOptional?: boolean;
	progressLabel: string;
	progressValue: number;
	title: string;
}

export interface SlotData {
	count: string;
	icon: string;
	id: string;
	isSelected?: boolean;
}

export const pulseTweenInfo = new TweenInfo(
	1.4,
	Enum.EasingStyle.Sine,
	Enum.EasingDirection.InOut,
	-1,
	true,
);

export const marketChips: ReadonlyArray<ChipData> = [
	{
		change: "↗+12%",
		changeColor: hudTheme.colors.green,
		icon: "∿",
		label: "Market Demand",
		value: "High",
	},
	{
		change: "↗+8",
		changeColor: hudTheme.colors.green,
		icon: "⚇",
		label: "Active Buyers",
		value: "247",
	},
	{
		change: "↘-5%",
		changeColor: hudTheme.colors.red,
		icon: "⬡",
		label: "Stock Level",
		value: "85%",
	},
];

export const objectives: ReadonlyArray<ObjectiveData> = [
	{
		description: "Sell any item to a customer",
		progressLabel: "0/1",
		progressValue: 0,
		title: "Make your first sale",
	},
	{
		description: "Accumulate sales to reach the milestone",
		progressLabel: "7250 / 10000",
		progressValue: 0.725,
		title: "Reach $10,000 in total sales",
	},
	{
		description: "Find and stock rare quality items in your shop",
		isOptional: true,
		progressLabel: "2/5",
		progressValue: 0.4,
		title: "Unlock rare items",
	},
];

export const slots: ReadonlyArray<SlotData> = [
	{ id: "battery", count: "5", icon: "🔋", isSelected: true },
	{ id: "gem", count: "2", icon: "💎" },
	{ id: "spark", count: "12", icon: "✨" },
	{ id: "tree", count: "", icon: "🌳" },
	{ id: "cube", count: "", icon: "⬡" },
	{ id: "pill", count: "8", icon: "💊" },
];
