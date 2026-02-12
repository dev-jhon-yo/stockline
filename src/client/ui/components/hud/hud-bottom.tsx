import React from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import type { HudLayoutInfo } from "./hud-root";
import { slots } from "./hud-data";
import { QuickSlot } from "./hud-primitives";
import { hudTheme } from "./hud-theme";

interface BottomHudProps {
	ctaGlowRef: React.RefObject<UIStroke>;
	layout: HudLayoutInfo;
}

export function BottomHud({ ctaGlowRef, layout }: Readonly<BottomHudProps>): React.Element {
	const rem = useRem();

	const hideCta = layout.isPhone && layout.isShort;

	const bottomInset = rem(layout.isShort ? 6 : 10, "pixel");
	const gap = rem(layout.isShort ? 8 : 10, "pixel");

	const hotbarHeight = rem(layout.isPhone ? 58 : layout.isUltraCompact ? 64 : 70, "pixel");
	const hotbarMinW = rem(layout.isPhone ? 312 : layout.isUltraCompact ? 396 : 446, "pixel");
	const hotbarMaxW = rem(layout.isPhone ? 380 : layout.isCompact ? 500 : 560, "pixel");

	const ctaHeight = rem(layout.isPhone ? 56 : layout.isUltraCompact ? 62 : 68, "pixel");
	const ctaMinW = rem(layout.isPhone ? 232 : layout.isUltraCompact ? 276 : 304, "pixel");
	const ctaMaxW = rem(layout.isPhone ? 304 : layout.isCompact ? 368 : 412, "pixel");

	const hotbarY = -bottomInset;
	const ctaY = -(bottomInset + hotbarHeight + gap);
	const quickSlotCompact = layout.isPhone || layout.isUltraCompact;

	return (
		<>
			<frame
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundColor3={hudTheme.colors.surface}
				BackgroundTransparency={0.2}
				BorderSizePixel={0}
				Position={new UDim2(0.5, 0, 1, hotbarY)}
				Size={new UDim2(0, hotbarMaxW, 0, hotbarHeight)}
				ZIndex={hudTheme.layers.bottom}
			>
				<uisizeconstraint
					MaxSize={new Vector2(hotbarMaxW, hotbarHeight)}
					MinSize={new Vector2(hotbarMinW, hotbarHeight)}
				/>
				<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
				<uistroke
					Color={hudTheme.colors.stroke}
					Thickness={rem(1.2, "pixel")}
					Transparency={0.3}
				/>
				<uipadding
					PaddingBottom={rem(new UDim(0, 5), "pixel")}
					PaddingLeft={rem(new UDim(0, 6), "pixel")}
					PaddingRight={rem(new UDim(0, 6), "pixel")}
					PaddingTop={rem(new UDim(0, 6), "pixel")}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={rem(new UDim(0, 5), "pixel")}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>

				<frame
					BackgroundColor3={hudTheme.colors.surfaceStrong}
					BackgroundTransparency={0.26}
					BorderSizePixel={0}
					Size={new UDim2(0, rem(34, "pixel"), 0, rem(34, "pixel"))}
				>
					<uicorner CornerRadius={new UDim(1, 0)} />
					<uistroke
						Color={hudTheme.colors.stroke}
						Thickness={rem(1.1, "pixel")}
						Transparency={0.32}
					/>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.GothamBold}
						Size={new UDim2(1, 0, 1, 0)}
						Text="⬡"
						TextColor3={hudTheme.colors.blue}
						TextSize={rem(13, "pixel")}
					/>
				</frame>

				{slots.map((slot, index) => {
					return (
						<QuickSlot
							key={slot.id}
							compact={quickSlotCompact}
							data={slot}
							index={index}
						/>
					);
				})}
			</frame>

			{hideCta ? undefined : (
				<frame
					AnchorPoint={new Vector2(0.5, 1)}
					BackgroundColor3={hudTheme.colors.surface}
					BackgroundTransparency={0.16}
					BorderSizePixel={0}
					Position={new UDim2(0.5, 0, 1, ctaY)}
					Size={new UDim2(0, ctaMaxW, 0, ctaHeight)}
					ZIndex={hudTheme.layers.bottom}
				>
					<uisizeconstraint
						MaxSize={new Vector2(ctaMaxW, ctaHeight)}
						MinSize={new Vector2(ctaMinW, ctaHeight)}
					/>
					<uicorner CornerRadius={rem(hudTheme.radius.lg, "pixel")} />
					<uistroke
						ref={ctaGlowRef}
						Color={hudTheme.colors.glowGreen}
						Thickness={rem(1.8, "pixel")}
						Transparency={0.35}
					/>
					<uipadding
						PaddingBottom={rem(new UDim(0, 8), "pixel")}
						PaddingLeft={rem(new UDim(0, 10), "pixel")}
						PaddingRight={rem(new UDim(0, 10), "pixel")}
						PaddingTop={rem(new UDim(0, 8), "pixel")}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={rem(new UDim(0, 10), "pixel")}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>

					<frame
						BackgroundColor3={hudTheme.colors.green}
						BackgroundTransparency={0.78}
						BorderSizePixel={0}
						Size={rem(new UDim2(0, layout.isUltraCompact ? 38 : 48, 1, 0), "pixel")}
					>
						<uicorner CornerRadius={rem(hudTheme.radius.md, "pixel")} />
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Size={new UDim2(1, 0, 1, 0)}
							Text="E"
							TextColor3={hudTheme.colors.green}
							TextSize={rem(layout.isUltraCompact ? 16 : 20, "pixel")}
						/>
					</frame>

					<frame
						BackgroundTransparency={1}
						Size={new UDim2(1, -rem(layout.isUltraCompact ? 48 : 58, "pixel"), 1, 0)}
					>
						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.GothamMedium}
							Size={new UDim2(1, 0, 0.56, 0)}
							Text="🛒  Purchase Item"
							TextColor3={hudTheme.colors.textPrimary}
							TextSize={rem(layout.isUltraCompact ? 14 : 17, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						>
							<uitextsizeconstraint
								MaxTextSize={rem(layout.isUltraCompact ? 16 : 18, "pixel")}
								MinTextSize={rem(12, "pixel")}
							/>
						</textlabel>

						<textlabel
							BackgroundTransparency={1}
							Font={Enum.Font.Gotham}
							Position={new UDim2(0, 0, 0.56, 0)}
							Size={new UDim2(1, 0, 0.44, 0)}
							Text="Ion Battery • $150"
							TextColor3={hudTheme.colors.textSecondary}
							TextSize={rem(layout.isUltraCompact ? 11 : 13, "pixel")}
							TextXAlignment={Enum.TextXAlignment.Left}
						>
							<uitextsizeconstraint
								MaxTextSize={rem(layout.isUltraCompact ? 12 : 15, "pixel")}
								MinTextSize={rem(10, "pixel")}
							/>
						</textlabel>
					</frame>
				</frame>
			)}
		</>
	);
}
