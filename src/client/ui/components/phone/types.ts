import type React from "@rbxts/react";

export interface AppTab {
	readonly icon: string;
	readonly id: string;
	readonly tooltip: string;
}

export interface AppIdentity {
	readonly iconPattern: string;
	readonly tabs: ReadonlyArray<AppTab>;
	readonly themeColor: Color3;
	readonly title: string;
}

export interface AppLayoutProps {
	readonly activeTabId: string;
	readonly children?: React.ReactNode;
	readonly identity: AppIdentity;
	readonly onBack: () => void;
	readonly onTabChange: (id: string) => void;
}
