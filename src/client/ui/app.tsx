import React from "@rbxts/react";

import { PhoneRoot } from "./components/phone/phone-root";
import { Layer } from "./components/primitive";
import { HudRoot } from "./components/hud/hud-root";

export function App(): React.Element {
	return (
		<Layer key="hud-layer">
			<PhoneRoot />
			<HudRoot />
		</Layer>
	);
}
