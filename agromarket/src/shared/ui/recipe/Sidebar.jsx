import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Sidebar({ onSelectCategory }) {
    // ✔ Redux에서 카테고리 가져오기
    const categoryList = useSelector((state) => state.category.categoryList);

    // ✔ 어떤 메인 카테고리가 열렸는지 저장
    const [openMain, setOpenMain] = useState(null);

    // ✔ 어떤 서브 카테고리가 선택됐는지 저장
    const [selectedSub, setSelectedSub] = useState(null);

    return (
        <div style={{ width: "240px", borderRight: "1px solid #ddd", padding: "20px" }}>
            <h3 style={{ marginBottom: "20px" }}>카테고리</h3>

            {categoryList.map((main) => (
                <div key={main.id} style={{ marginBottom: "15px" }}>
                    {/* 🔸 메인 카테고리 */}
                    <div
                        onClick={() => setOpenMain(openMain === main.id ? null : main.id)}
                        style={{
                            cursor: "pointer",
                            fontWeight: openMain === main.id ? "bold" : "normal",
                            marginBottom: "8px"
                        }}
                    >
                        {main.name}
                    </div>

                    {/* 🔸 선택된 메인일 때만 서브 카테고리 펼치기 */}
                    {openMain === main.id && (
                        <div style={{ marginLeft: "15px" }}>
                            {main.subCategories.map((sub) => (
                                <div
                                    key={sub.id}
                                    onClick={() => {
                                        setSelectedSub(sub.id);
                                        onSelectCategory?.(main.id, sub.id);
                                    }}
                                    style={{
                                        padding: "4px 0",
                                        cursor: "pointer",
                                        color: selectedSub === sub.id ? "#5f0080" : "black",
                                        fontWeight: selectedSub === sub.id ? "bold" : "normal"
                                    }}
                                >
                                    - {sub.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}