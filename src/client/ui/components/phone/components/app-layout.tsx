import React from "@rbxts/react";
import { Frame, Group, SearchBar, TextLabel } from "../../primitive";
import type { AppLayoutProps } from "../types";
import { AnimatedBackground } from "./animated-background";
import { AppNavBar } from "./app-nav-bar";
import { useRem } from "client/ui/hooks";
import { defaultTheme } from "client/ui/themes";
import { UltraWideContainer } from "../../ultra-wide-container";

export function AppLayout({
	activeTabId,
	identity,
	onBack,
	onTabChange,
	children,
	searchTerm,
	onSearchChange,
}: AppLayoutProps): React.Element {
	const rem = useRem();

	return (
		<UltraWideContainer>
			<Group
				key="AppRoot"
				Native={{
					ClipsDescendants: false,
					Size: new UDim2(1, 0, 1, 0),
				}}
			>
				<AnimatedBackground
					color={identity.themeColor}
					icon={identity.iconPattern}
				/>

				<Frame
					key="AppCanvas"
					Native={{
						AnchorPoint: new Vector2(0.5, 0.5),
						BackgroundColor3: Color3.fromRGB(31, 32, 46),
						Position: new UDim2(0.5, 0, 0.5, 0),
						Size: new UDim2(0.9, rem(50), 0.85, 0),
						ZIndex: 5,
					}}
				>
					<uicorner CornerRadius={new UDim(0, rem(2))} />

					<uipadding
						PaddingTop={new UDim(0, rem(10))}
						PaddingBottom={new UDim(0, rem(20))}
						PaddingLeft={new UDim(0, rem(25))}
						PaddingRight={new UDim(0, rem(25))}
					/>
					{children}
				</Frame>

				<Group
					key="Overlay"
					Native={{ Size: new UDim2(1, 0, 1, 0), ZIndex: 10 }}
				>
					{/* Título e Subtítulo usando rem para TextSize e Offset */}
					<TextLabel
						Font={Enum.Font.FredokaOne}
						Native={{
							Position: new UDim2(0.05, 0, 0, rem(10)),
							Size: new UDim2(1, 0, 0, rem(3)),
							TextXAlignment: Enum.TextXAlignment.Left,
						}}
						Text={identity.title}
						TextColor={defaultTheme.colors.text.title}
						TextSize={rem(3.5)}
					/>
					<TextLabel
						Font={Enum.Font.FredokaOne}
						Native={{
							Position: new UDim2(0.05, 0, 0, rem(13)),
							Size: new UDim2(1, 0, 0, rem(3)),
							TextXAlignment: Enum.TextXAlignment.Left,
						}}
						Text={"✨ Find what you need"}
						TextColor={defaultTheme.colors.text.sub_title}
						TextSize={rem(1.5)}
					/>

					<SearchBar
						text={searchTerm ?? ""}
						onTextChange={(text) => onSearchChange?.(text)}
						placeholder="Search supply..."
						Native={{
							AnchorPoint: new Vector2(1, 0.5),
							Position: new UDim2(0, -55, 0, rem(19)),
							Size: new UDim2(0, rem(20), 0, rem(3)),
						}}
					/>

					<AppNavBar
						tabs={identity.tabs}
						activeTabId={activeTabId}
						onTabChange={onTabChange}
						themeColor={identity.themeColor}
					/>

					<textbutton
						key="BackButton"
						AnchorPoint={new Vector2(0.5, 1)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						Event={{ Activated: onBack }}
						Position={new UDim2(0.5, 0, 0.98, 0)}
						Size={new UDim2(0, rem(5), 0, rem(2))}
						Text=""
					>
						<uicorner CornerRadius={new UDim(0, rem(0.5))} />
						<uistroke Color={identity.themeColor} Thickness={rem(1)} />
						<TextLabel
							Font={Enum.Font.FredokaOne}
							Text="RETURN"
							TextColor={identity.themeColor}
							TextSize={rem(1)}
						/>
					</textbutton>
				</Group>
			</Group>
		</UltraWideContainer>
	);
}
