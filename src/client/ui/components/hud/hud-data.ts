export interface DayTimeModel {
	dayLabel: string;
	periodLabel: string;
	timeLabel: string;
}

export interface MarketMetric {
	accent: Color3;
	change: string;
	changeColor: Color3;
	icon: string;
	label: string;
	value: string;
}

export interface ObjectiveModel {
	actionLabel: string;
	current: number;
	description: string;
	icon: string;
	id: string;
	isOptional?: boolean;
	reward: string;
	target: number;
	title: string;
	unit?: string;
}

export interface InventorySlot {
	hasNotification?: boolean;
	icon: string;
	id: number;
	name: string;
	notificationColor?: Color3;
	quantity?: number;
}

export const mockDayTime: DayTimeModel = {
	dayLabel: "Day 5",
	periodLabel: "Afternoon",
	timeLabel: "02:37 PM",
};

export const mockMarketMetrics: ReadonlyArray<MarketMetric> = [
	{
		accent: Color3.fromRGB(66, 180, 244),
		change: "+12%",
		changeColor: Color3.fromRGB(67, 176, 71),
		icon: "↗",
		label: "Demand",
		value: "High",
	},
	{
		accent: Color3.fromRGB(180, 79, 216),
		change: "+8",
		changeColor: Color3.fromRGB(67, 176, 71),
		icon: "👥",
		label: "Buyers",
		value: "247",
	},
	{
		accent: Color3.fromRGB(255, 140, 0),
		change: "-5%",
		changeColor: Color3.fromRGB(244, 67, 54),
		icon: "▣",
		label: "Stock",
		value: "85%",
	},
];

export const mockObjectives: ReadonlyArray<ObjectiveModel> = [
	{
		id: "1",
		actionLabel: "Claim",
		current: 0,
		description: "Sell any item to a customer",
		icon: "🏆",
		reward: "100 XP",
		target: 1,
		title: "First Sale",
	},
	{
		id: "2",
		actionLabel: "Go",
		current: 7250,
		description: "Reach $10,000 in total sales",
		icon: "💎",
		reward: "500 Gold",
		target: 10000,
		title: "Sales Master",
		unit: "$",
	},
	{
		id: "3",
		actionLabel: "View",
		current: 2,
		description: "Find rare quality items",
		icon: "⚔",
		isOptional: true,
		reward: "Rare Chest",
		target: 5,
		title: "Rare Hunter",
	},
];

export const mockInventory: ReadonlyArray<InventorySlot> = [
	{ id: 1, name: "Empty", icon: "" },
	{ id: 2, name: "Energy Cell", icon: "🔋", quantity: 5 },
	{
		id: 3,
		name: "Diamond",
		hasNotification: true,
		icon: "💎",
		notificationColor: Color3.fromRGB(66, 180, 244),
		quantity: 2,
	},
	{
		id: 4,
		name: "Gold Dust",
		hasNotification: true,
		icon: "✨",
		notificationColor: Color3.fromRGB(244, 67, 54),
	},
	{ id: 5, name: "Herbs", icon: "🌱", quantity: 12 },
	{ id: 6, name: "Scrap", icon: "", quantity: 8 },
	{ id: 7, name: "Health Pill", icon: "💊" },
];
