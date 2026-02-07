export type PhonePage = "DIY" | "Home" | "Map" | "NookMiles" | "Passport";

export interface AppConfig {
	color: Color3;
	icon: string;
	id: PhonePage;
	name: string;
}
