import { LN10 } from "@rbxts/luau-polyfill/out/Math";
import React, { useState, useCallback } from "@rbxts/react";
import { useRem, useTheme } from "client/ui/hooks";

interface SearchBarProps {
	text: string;
	onTextChange: (text: string) => void;
	placeholder?: string;
	Native?: Partial<Omit<React.InstanceProps<Frame>, "BackgroundColor3">>;
}

export function SearchBar({
	text,
	onTextChange,
	placeholder = "Search...",
	Native,
}: Readonly<SearchBarProps>): React.Element {
	const rem = useRem();
	const [isFocused, setIsFocused] = useState(false);

	const styles = {
		background: Color3.fromRGB(45, 47, 61),
		borderDefault: Color3.fromRGB(70, 73, 89),
		borderFocused: Color3.fromRGB(180, 150, 255),
		textPlaceholder: Color3.fromRGB(108, 112, 134),
		textMain: Color3.fromRGB(255, 255, 255),
	};

	const handleClear = useCallback(() => {
		onTextChange("");
	}, [onTextChange]);

	return (
		<frame BackgroundColor3={styles.background} BorderSizePixel={0} {...Native}>
			<uicorner CornerRadius={new UDim(0, rem(0.8))} />
			<uistroke
				Color={isFocused ? styles.borderFocused : styles.borderDefault}
				Thickness={isFocused ? 1.5 : 0}
				Transparency={0}
			/>

			<uipadding
				PaddingLeft={new UDim(0, rem(3))}
				PaddingRight={new UDim(0, rem(1))}
			/>

			<imagelabel
				BackgroundTransparency={1}
				Image="rbxassetid://3926305904"
				ImageColor3={styles.textPlaceholder}
				ImageRectOffset={new Vector2(964, 324)}
				ImageRectSize={new Vector2(36, 36)}
				Size={new UDim2(0, rem(1.5), 0, rem(1.5))}
				Position={new UDim2(0, -5, 0.5, 0)}
				AnchorPoint={new Vector2(1, 0.5)}
			/>

			<textbox
				Text={text}
				PlaceholderText={placeholder}
				PlaceholderColor3={styles.textPlaceholder}
				TextColor3={styles.textMain}
				Font={Enum.Font.Gotham}
				TextSize={rem(1)}
				BackgroundTransparency={1}
				ClearTextOnFocus={false}
				ClipsDescendants={true}
				Size={new UDim2(1, 0, 1, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				TextXAlignment={Enum.TextXAlignment.Left}
				Event={{
					Focused: () => setIsFocused(true),
					FocusLost: () => setIsFocused(false),
				}}
				Change={{
					Text: (rbx) => onTextChange(rbx.Text),
				}}
			/>

			{text.size() > 0 ? (
				<textbutton
					Text="×"
					Font={Enum.Font.GothamBold}
					TextSize={rem(1)}
					TextColor3={styles.textPlaceholder}
					BackgroundTransparency={1}
					Size={new UDim2(0, rem(20), 0, rem(20))}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(1, 0.5)}
					Event={{ Activated: handleClear }}
				/>
			) : undefined}
		</frame>
	);
}
