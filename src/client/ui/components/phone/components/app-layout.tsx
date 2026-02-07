import React from "@rbxts/react";

import { Frame, Group, TextLabel } from "../../primitive";
import type { AppLayoutProps } from "../types";
import { AnimatedBackground } from "./animated-background";

export function AppLayout({
	activeTabId,
	identity,
	onBack,
	onTabChange,
	children,
}: AppLayoutProps): React.Element {
	return (
		<Group
			key="AppRoot"
			Native={{
				ClipsDescendants: false,
				Size: new UDim2(1, 0, 1, 0),
			}}
		>
			<AnimatedBackground color={identity.themeColor} icon={identity.iconPattern} />

			<Frame
				key="AppCanvas"
				Native={{
					AnchorPoint: new Vector2(0.5, 0.5),
					BackgroundColor3: Color3.fromRGB(250, 249, 230),
					Position: new UDim2(0.5, 0, 0.52, 0),
					Size: new UDim2(0.94, 0, 0.78, 0),
					ZIndex: 5,
				}}
			>
				<uicorner CornerRadius={new UDim(0, 30)} />
				<uipadding
					PaddingLeft={new UDim(0, 25)}
					PaddingRight={new UDim(0, 25)}
					PaddingTop={new UDim(0, 40)}
				/>
				{children}
			</Frame>

			<Group key="Overlay" Native={{ Size: new UDim2(1, 0, 1, 0), ZIndex: 10 }}>
				<TextLabel
					Font={Enum.Font.FredokaOne}
					Native={{
						Position: new UDim2(0, 40, 0, 40),
						Size: new UDim2(0.4, 0, 0, 30),
						TextXAlignment: Enum.TextXAlignment.Left,
					}}
					Text={identity.title.upper()}
					TextColor={Color3.fromRGB(255, 255, 255)}
					TextSize={24}
				/>

				<Frame
					key="TabContainer"
					Native={{
						AnchorPoint: new Vector2(0.5, 0),
						BackgroundTransparency: 1,
						Position: new UDim2(0.5, 0, 0, 75),
						Size: new UDim2(0, 250, 0, 50),
					}}
				>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						Padding={new UDim(0, 15)}
					/>
					{identity.tabs.map((tab) => {
						return (
							<imagebutton
								key={tab.id}
								BackgroundColor3={
									activeTabId === tab.id
										? Color3.fromRGB(255, 160, 0)
										: Color3.fromRGB(255, 255, 255)
								}
								Event={{
									Activated: () => {
										onTabChange(tab.id);
									},
								}}
								Size={new UDim2(0, 45, 0, 45)}
							>
								<uicorner CornerRadius={new UDim(1, 0)} />
								<uistroke Color={Color3.fromRGB(255, 255, 255)} Thickness={3} />
								<imagelabel
									BackgroundTransparency={1}
									Image={tab.icon}
									Position={new UDim2(0.2, 0, 0.2, 0)}
									Size={new UDim2(0.6, 0, 0.6, 0)}
								/>
							</imagebutton>
						);
					})}
				</Frame>

				<textbutton
					key="BackButton"
					AnchorPoint={new Vector2(0.5, 1)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					Event={{ Activated: onBack }}
					Position={new UDim2(0.5, 0, 1, -20)}
					Size={new UDim2(0, 160, 0, 50)}
					Text=""
				>
					<uicorner CornerRadius={new UDim(0, 25)} />
					<uistroke Color={identity.themeColor} Thickness={3} />
					<TextLabel
						Font={Enum.Font.FredokaOne}
						Text="RETURN"
						TextColor={identity.themeColor}
						TextSize={20}
					/>
				</textbutton>
			</Group>
		</Group>
	);
}
