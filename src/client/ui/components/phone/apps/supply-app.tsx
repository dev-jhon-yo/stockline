// cspell:disable
import React, { useState, useMemo } from "@rbxts/react";
import { Frame, TextLabel, Group } from "../../primitive";
import { AppLayout } from "../components/app-layout";
import type { AppIdentity } from "../types";
import { useRem } from "client/ui/hooks";

interface ShopItem {
	id: number;
	name: string;
	icon: string;
	category: "Tech" | "Resource" | "Food";
	price: number;
	rarity: "COMMON" | "RARE" | "LEGENDARY";
}

const MOCK_ITEM_ICON = "rbxassetid://128452493475727";
const SHOP_DATA: ShopItem[] = [
	{
		id: 0,
		name: "Ion Battery",
		category: "Tech",
		icon: MOCK_ITEM_ICON,
		price: 150,
		rarity: "COMMON",
	},
	{
		id: 1,
		name: "Nebula Wood",
		category: "Resource",
		icon: MOCK_ITEM_ICON,
		price: 45,
		rarity: "COMMON",
	},
	{
		id: 2,
		name: "Quantum CPU",
		category: "Tech",
		icon: MOCK_ITEM_ICON,
		price: 850,
		rarity: "RARE",
	},
	{
		id: 3,
		name: "Dried Ration",
		category: "Food",
		icon: MOCK_ITEM_ICON,
		price: 20,
		rarity: "COMMON",
	},
	{
		id: 4,
		name: "Void Essence",
		category: "Resource",
		icon: MOCK_ITEM_ICON,
		price: 5000,
		rarity: "LEGENDARY",
	},
	{
		id: 5,
		name: "Medi-Gel",
		category: "Food",
		icon: MOCK_ITEM_ICON,
		price: 100,
		rarity: "COMMON",
	},
];

const SUPPLY_IDENTITY: AppIdentity = {
	iconPattern: "rbxassetid://128452493475727",
	tabs: [
		{ id: "all", icon: "rbxassetid://16124021200", tooltip: "All" },
		{ id: "resources", icon: "rbxassetid://16124021200", tooltip: "Resources" },
		{ id: "tech", icon: "rbxassetid://16124021200", tooltip: "Tech" },
		{ id: "food", icon: "rbxassetid://16124021200", tooltip: "Food" },
	],
	themeColor: Color3.fromRGB(13, 13, 20),
	title: "Welcome to Supply Shop",
};

export function SupplyApp({
	onBack,
}: {
	readonly onBack: () => void;
}): React.Element {
	const [selectedIdx, setSelectedIdx] = useState<number | undefined>(undefined);
	const [activeTab, setActiveTab] = useState("all");
	const [cart, setCart] = useState<ShopItem[]>([]);
	const [search, setSearch] = useState("");

	const rem = useRem();

	const filteredItems = useMemo(() => {
		const lowerSearch = search.lower();
		print("Filtrando para:", lowerSearch); // Debug: Veja se o texto chega aqui

		return SHOP_DATA.filter((item) => {
			const matchesTab =
				activeTab === "all" || item.category.lower() === activeTab.lower();

			// find retorna um número (posição) ou nil.
			// No TSXP, nil vira undefined.
			const matchesSearch =
				search === "" || item.name.lower().find(lowerSearch)[0] !== undefined;

			return matchesTab && matchesSearch;
		});
	}, [activeTab, search]);

	const subtotal = useMemo(
		() => cart.reduce((acc, item) => acc + item.price, 0),
		[cart],
	);
	const total = subtotal + math.floor(subtotal * 0.02);

	return (
		<AppLayout
			activeTabId={activeTab}
			identity={SUPPLY_IDENTITY}
			onBack={onBack}
			searchTerm={search}
			onSearchChange={setSearch}
			onTabChange={setActiveTab}
		>
			<Group key="MainUI" Native={{ Size: new UDim2(1, 0, 1, 0) }}>
				<uipadding
					PaddingBottom={new UDim(0, 20)}
					PaddingLeft={new UDim(0, 20)}
					PaddingRight={new UDim(0, 20)}
					PaddingTop={new UDim(0, 20)}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0, 20)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>

				{/* COLUNA ESQUERDA: CARRINHO */}
				<Frame
					key="CartPanel"
					Native={{
						Size: new UDim2(0.3, -10, 1, 0),
						BackgroundColor3: Color3.fromRGB(22, 22, 32),
						BorderSizePixel: 0,
						LayoutOrder: 1,
					}}
				>
					<uicorner CornerRadius={new UDim(0, 12)} />
					<uipadding
						PaddingBottom={new UDim(0, 15)}
						PaddingLeft={new UDim(0, 15)}
						PaddingRight={new UDim(0, 15)}
						PaddingTop={new UDim(0, 15)}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Vertical}
						Padding={new UDim(0, 15)}
					/>

					<Frame
						Native={{
							Size: new UDim2(1, 0, 0, 60),
							BackgroundColor3: Color3.fromRGB(30, 30, 45),
						}}
					>
						<uicorner CornerRadius={new UDim(0, 8)} />
						<uipadding PaddingLeft={new UDim(0, 12)} />
						<uilistlayout
							VerticalAlignment={Enum.VerticalAlignment.Center}
							Padding={new UDim(0, 2)}
						/>
						<TextLabel
							Text="Available Credits"
							TextSize={10}
							TextColor={Color3.fromRGB(160, 160, 180)}
							Native={{
								Size: new UDim2(1, 0, 0, 14),
								TextXAlignment: Enum.TextXAlignment.Left,
							}}
						/>
						<TextLabel
							Text="12,450"
							Font={Enum.Font.GothamBold}
							TextSize={18}
							TextColor={Color3.fromRGB(255, 255, 255)}
							Native={{
								Size: new UDim2(1, 0, 0, 20),
								TextXAlignment: Enum.TextXAlignment.Left,
							}}
						/>
					</Frame>

					{/* Lista do Carrinho - Corrigido ScrollView nativo */}
					<scrollingframe
						Size={new UDim2(1, 0, 1, -180)}
						BackgroundTransparency={1}
						BorderSizePixel={0}
						CanvasSize={new UDim2(0, 0, 0, 0)}
						AutomaticCanvasSize={Enum.AutomaticSize.Y}
						ScrollBarThickness={2}
					>
						<uilistlayout Padding={new UDim(0, 8)} />
						{cart.map((item, index) => (
							<Frame
								key={index}
								Native={{
									Size: new UDim2(1, -5, 0, 35),
									BackgroundColor3: Color3.fromRGB(28, 28, 40),
								}}
							>
								<uicorner CornerRadius={new UDim(0, 4)} />
								<TextLabel
									Text={item.name}
									TextSize={12}
									TextColor={Color3.fromRGB(200, 200, 220)}
									Native={{
										Size: new UDim2(1, -30, 1, 0),
										Position: new UDim2(0, 10, 0, 0),
										TextXAlignment: Enum.TextXAlignment.Left,
									}}
								/>
								<textbutton
									Text="×"
									TextSize={18}
									TextColor3={Color3.fromRGB(255, 100, 100)}
									BackgroundTransparency={1}
									Size={new UDim2(0, 30, 1, 0)}
									Position={new UDim2(1, 0, 0, 0)}
									AnchorPoint={new Vector2(1, 0)}
									Event={{
										Activated: () =>
											setCart(cart.filter((_, i) => i !== index)),
									}}
								/>
							</Frame>
						))}
					</scrollingframe>

					<Frame
						Native={{
							Size: new UDim2(1, 0, 0, 100),
							BackgroundTransparency: 1,
						}}
					>
						<uilistlayout
							VerticalAlignment={Enum.VerticalAlignment.Bottom}
							Padding={new UDim(0, 8)}
						/>
						<CartRow label="Total" value={`⌬ ${total}`} isBold />
						<textbutton
							Text="Complete Trade"
							Font={Enum.Font.GothamBold}
							TextSize={14}
							TextColor3={Color3.fromRGB(0, 0, 0)}
							BackgroundColor3={
								cart.size() > 0
									? Color3.fromRGB(180, 150, 255)
									: Color3.fromRGB(45, 45, 60)
							}
							Size={new UDim2(1, 0, 0, 40)}
						>
							<uicorner CornerRadius={new UDim(0, 6)} />
						</textbutton>
					</Frame>
				</Frame>

				{/* COLUNA DIREITA: GRID */}
				<scrollingframe
					Size={new UDim2(0.7, -10, 1, 0)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					AutomaticCanvasSize={Enum.AutomaticSize.Y}
					CanvasSize={new UDim2(0, 0, 0, 0)}
					ScrollBarThickness={4}
				>
					<uipadding PaddingTop={new UDim(0.2, 0)} />
					<uigridlayout
						CellPadding={new UDim2(0, 15, 0, 15)}
						CellSize={rem(new UDim2(0, 240, 0, 220))}
						HorizontalAlignment={Enum.HorizontalAlignment.Left}
					/>

					{/* EMPTY LIST CHECK */}
					{filteredItems.size() === 0 && search !== "" ? (
						<Frame
							Native={{
								Size: new UDim2(1, 0, 0, 200),
								BackgroundTransparency: 1,
								LayoutOrder: 99, // Garante que fique visível no grid se necessário
							}}
						>
							<uilistlayout
								FillDirection={Enum.FillDirection.Vertical}
								VerticalAlignment={Enum.VerticalAlignment.Center}
								HorizontalAlignment={Enum.HorizontalAlignment.Center}
								Padding={new UDim(0, 10)}
							/>
							<imagelabel
								Image="rbxassetid://3926305904"
								ImageColor3={Color3.fromRGB(80, 80, 100)}
								BackgroundTransparency={1}
								Size={new UDim2(0, 64, 0, 64)}
							/>
							<TextLabel
								Text={`No results for "${search}"`}
								TextColor={Color3.fromRGB(120, 120, 140)}
								TextSize={16}
								Font={Enum.Font.GothamBold}
								Native={{ Size: new UDim2(1, 0, 0, 20) }}
							/>
						</Frame>
					) : undefined}

					{filteredItems.map((item) => (
						<ProductCard
							key={item.id}
							item={item}
							isSelected={selectedIdx === item.id}
							onClick={() => setSelectedIdx(item.id)}
							onAdd={() => setCart([...cart, item])}
						/>
					))}
				</scrollingframe>
			</Group>
		</AppLayout>
	);
}

function ProductCard({
	item,
	isSelected,
	onClick,
	onAdd,
}: {
	item: ShopItem;
	isSelected: boolean;
	onClick: () => void;
	onAdd: () => void;
}) {
	const rarityColor =
		item.rarity === "LEGENDARY"
			? Color3.fromRGB(255, 180, 50)
			: item.rarity === "RARE"
				? Color3.fromRGB(80, 200, 255)
				: Color3.fromRGB(180, 180, 200);

	return (
		<Frame
			Native={{
				BackgroundColor3: Color3.fromRGB(45, 47, 61),
				BorderSizePixel: 0,
			}}
		>
			<uicorner CornerRadius={new UDim(0, 10)} />
			<uistroke
				Color={
					isSelected
						? Color3.fromRGB(180, 150, 255)
						: Color3.fromRGB(45, 45, 60)
				}
				Thickness={isSelected ? 2 : 1}
			/>

			<textbutton
				Text=""
				BackgroundTransparency={1}
				Size={new UDim2(1, 0, 1, 0)}
				ZIndex={1}
				Event={{ Activated: onClick }}
			/>

			<uipadding
				PaddingBottom={new UDim(0, 70)}
				PaddingLeft={new UDim(0, 12)}
				PaddingRight={new UDim(0, 12)}
				PaddingTop={new UDim(0, 1)}
			/>

			<Frame
				Native={{
					Size: new UDim2(1, 0, 0, 130),
					BackgroundColor3: Color3.fromRGB(24, 25, 36),
					ZIndex: 2,
				}}
			>
				<uicorner CornerRadius={new UDim(0, 8)} />
				<imagelabel
					Image={item.icon}
					Size={new UDim2(0.6, 0, 0.6, 0)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					ScaleType={Enum.ScaleType.Fit}
				/>

				<Frame
					Native={{
						Size: new UDim2(0, 70, 0, 25),
						Position: new UDim2(1, 0, 0, 0),
						AnchorPoint: new Vector2(1, 0),
						BackgroundColor3: Color3.fromRGB(166, 173, 200),
						BackgroundTransparency: 0.9,
					}}
				>
					<uicorner CornerRadius={new UDim(0, 8)} />
					<TextLabel
						Text={item.rarity}
						TextSize={9}
						Font={Enum.Font.GothamBold}
						TextColor={rarityColor}
						Native={{ Size: new UDim2(1, 0, 1, 0) }}
					/>
				</Frame>
			</Frame>

			<Frame
				Native={{
					Size: new UDim2(1, 0, 1, -110),
					Position: new UDim2(0.5, 5, 0, 165),
					BackgroundTransparency: 1,
					ZIndex: 3,
				}}
			>
				<TextLabel
					Text={item.name}
					Font={Enum.Font.GothamBold}
					TextSize={16}
					TextColor={Color3.fromRGB(205, 214, 244)}
					Native={{
						Size: new UDim2(1, 0, 0, 16),
						TextXAlignment: Enum.TextXAlignment.Left,
					}}
				/>
				<TextLabel
					Text={item.category.upper()}
					TextSize={10}
					TextColor={Color3.fromRGB(108, 112, 134)}
					Font={Enum.Font.GothamBold}
					Native={{
						Size: new UDim2(1, 0, 0, 12),
						Position: new UDim2(0.5, 0, 0, 40),
						TextXAlignment: Enum.TextXAlignment.Left,
					}}
				/>

				<Frame
					Native={{
						Size: new UDim2(1, 0, 0, 30),
						Position: new UDim2(0, 0, 1, 0),
						AnchorPoint: new Vector2(0, 1),
						BackgroundTransparency: 1,
					}}
				>
					<TextLabel
						Text={`💵 ${item.price}`}
						Font={Enum.Font.GothamBold}
						TextSize={16}
						TextColor={Color3.fromRGB(166, 227, 161)}
						Native={{
							Size: new UDim2(0.6, 0, 1, 0),
							Position: new UDim2(0.3, 0, 0, 45),
							TextXAlignment: Enum.TextXAlignment.Left,
						}}
					/>
					<textbutton
						Text="+"
						Font={Enum.Font.GothamBold}
						TextSize={25}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundColor3={Color3.fromRGB(70, 73, 89)}
						Size={new UDim2(0, 28, 0, 28)}
						Position={new UDim2(1, -6, 0.5, 25)}
						AnchorPoint={new Vector2(1, 0.5)}
						ZIndex={5}
						Event={{ Activated: onAdd }}
					>
						<uicorner CornerRadius={new UDim(0, 6)} />
					</textbutton>
				</Frame>
			</Frame>
		</Frame>
	);
}

function CartRow({
	label,
	value,
	isBold,
}: {
	label: string;
	value: string;
	isBold?: boolean;
}) {
	return (
		<Frame Native={{ Size: new UDim2(1, 0, 0, 18), BackgroundTransparency: 1 }}>
			<TextLabel
				Text={label}
				TextSize={12}
				TextColor={
					isBold ? Color3.fromRGB(255, 255, 255) : Color3.fromRGB(130, 130, 150)
				}
				Native={{
					Size: new UDim2(0.5, 0, 1, 0),
					TextXAlignment: Enum.TextXAlignment.Left,
				}}
			/>
			<TextLabel
				Text={value}
				Font={isBold ? Enum.Font.GothamBold : Enum.Font.Gotham}
				TextSize={isBold ? 14 : 12}
				TextColor={
					isBold ? Color3.fromRGB(180, 140, 255) : Color3.fromRGB(255, 255, 255)
				}
				Native={{
					Size: new UDim2(0.5, 0, 1, 0),
					Position: new UDim2(0.5, 0, 0, 0),
					TextXAlignment: Enum.TextXAlignment.Right,
				}}
			/>
		</Frame>
	);
}
