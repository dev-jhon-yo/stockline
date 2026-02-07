import React from "@rbxts/react";

import { PhoneRoot } from "./components/phone/phone-root";
import { Layer } from "./components/primitive";

export function App(): React.Element {
	return (
		<Layer key="phone-layer">
			<PhoneRoot />
		</Layer>
	);
}
