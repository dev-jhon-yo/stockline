import React, { useRef, useState } from "@rbxts/react";
import { TweenService } from "@rbxts/services";

import { Frame, Group } from "../primitive";
import { SupplyApp } from "./apps/supply-app";
import { AppGrid } from "./components/app-grid";
import { StatusBar } from "./components/status-bar";

export type PhonePage = "Builds" | "Home" | "Management" | "Shop" | "Supply" | "Tasks";

export function PhoneRoot(): React.Element {
	const [currentPage, setCurrentPage] = useState<PhonePage>(() => "Home");
	const circleRef = useRef<Frame>(undefined);

	const startTransition = (page: PhonePage, color: Color3): void => {
		const circle = circleRef.current;
		if (!circle) {
			return;
		}

		circle.BackgroundColor3 = color;
		circle.BackgroundTransparency = 0;
		circle.Size = new UDim2(0, 0, 0, 0);
		circle.Visible = true;

		const expand = TweenService.Create(
			circle,
			new TweenInfo(0.6, Enum.EasingStyle.Quart, Enum.EasingDirection.Out),
			{
				Size: new UDim2(15, 0, 15, 0),
			},
		);

		expand.Play();

		expand.Completed.Once(() => {
			setCurrentPage(page);

			task.delay(0.1, () => {
				const fade = TweenService.Create(circle, new TweenInfo(0.4), {
					BackgroundTransparency: 1,
				});

				fade.Play();

				fade.Completed.Once(() => {
					circle.Visible = false;
				});
			});
		});
	};

	return (
		<Group
			key="PhoneSystem"
			Native={{
				Size: new UDim2(1, 0, 1, 0),
			}}
		>
			{currentPage === "Home" && (
				<Frame
					key="PhoneDevice"
					Native={{
						AnchorPoint: new Vector2(0.5, 0.5),
						BackgroundColor3: Color3.fromRGB(245, 245, 235),
						ClipsDescendants: true,
						Position: new UDim2(0.5, 0, 0.5, 0),
						Size: new UDim2(0, 280, 0, 520),
					}}
				>
					<uicorner key="Corner" CornerRadius={new UDim(0, 45)} />
					<uistroke key="Border" Color={Color3.fromRGB(200, 200, 180)} Thickness={4} />

					<StatusBar />

					<Frame
						key="InnerScreen"
						Native={{
							BackgroundTransparency: 1,
							Position: new UDim2(0.5, 0, 0.5, 0),
							Size: new UDim2(1, 0, 1, -100),
						}}
					>
						<AppGrid
							onAppSelected={(id, color) => {
								startTransition(id as PhonePage, color);
							}}
						/>
					</Frame>
				</Frame>
			)}

			{currentPage === "Supply" && (
				<SupplyApp
					onBack={() => {
						setCurrentPage("Home");
					}}
				/>
			)}

			<frame
				key="TransitionCircle"
				ref={circleRef}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BorderSizePixel={0}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0, 0, 0, 0)}
				Visible={false}
				ZIndex={100}
			>
				<uicorner key="Round" CornerRadius={new UDim(1, 0)} />
			</frame>
		</Group>
	);
}
