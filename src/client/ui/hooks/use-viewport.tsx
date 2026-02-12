import { useCamera, useEventListener } from "@rbxts/pretty-react-hooks";
import React, { useCallback, useEffect, useMemo, useState } from "@rbxts/react";
import { GuiService } from "@rbxts/services";

const WIDE_ASPECT_RATIO = 2;
const TALL_ASPECT_RATIO = 1.45;

export type ViewportClass = "normal" | "tall" | "wide";

export interface ViewportSafeInsets {
	bottom: number;
	left: number;
	right: number;
	top: number;
}

export interface ViewportInfo {
	aspectRatio: number;
	class: ViewportClass;
	height: number;
	insets: ViewportSafeInsets;
	safeHeight: number;
	safeWidth: number;
	width: number;
}

function getViewportClass(aspectRatio: number): ViewportClass {
	if (aspectRatio >= WIDE_ASPECT_RATIO) {
		return "wide";
	}

	if (aspectRatio <= TALL_ASPECT_RATIO) {
		return "tall";
	}

	return "normal";
}

export function useViewport(): ViewportInfo {
	const camera = useCamera();
	const [size, setSize] = useState(() => camera.ViewportSize);

	const updateViewport = useCallback(() => {
		const nextSize = camera.ViewportSize;
		setSize((current) => {
			if (current.X === nextSize.X && current.Y === nextSize.Y) {
				return current;
			}

			return nextSize;
		});
	}, [camera]);

	useEventListener(camera.GetPropertyChangedSignal("ViewportSize"), updateViewport);

	useEffect(() => {
		updateViewport();
	}, [updateViewport]);

	return useMemo(() => {
		const [topLeftInset, bottomRightInset] = GuiService.GetGuiInset();

		const insets: ViewportSafeInsets = {
			bottom: bottomRightInset.Y,
			left: topLeftInset.X,
			right: bottomRightInset.X,
			top: topLeftInset.Y,
		};

		const safeWidth = math.max(0, size.X - insets.left - insets.right);
		const safeHeight = math.max(0, size.Y - insets.top - insets.bottom);
		const aspectRatio = safeWidth / math.max(1, safeHeight);

		return {
			aspectRatio,
			class: getViewportClass(aspectRatio),
			height: size.Y,
			insets,
			safeHeight,
			safeWidth,
			width: size.X,
		};
	}, [size]);
}
