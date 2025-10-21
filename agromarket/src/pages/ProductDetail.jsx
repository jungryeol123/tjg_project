import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { ImageList } from '../shared/constants/ImageList.jsx';
import { axiosGet } from 'shared/lib/axiosInstance.js'
import "../styles/components/ProductDetail.css";

export function ProductDetail() {
    const { pid } = useParams(); // 선택한 상품의 상품번호(primarykey)
    const [catalog, setCatalog] = useState({}); // 선택한 상품 정보
    // const [imgList, setImgList] = useState([]); // 선택한 상품의 이미지 리스트
    const [isWished, setIsWished] = useState(false); // 찜 상태 관리
    const [count, setCount] = useState(1);

    useEffect( () => {
        const fillter = async (pid) => {

            // getProductDetail();
            const jsonData = await axiosGet("/data/foodData.json");
            const [data] = jsonData.foodData.filter( data => data.pid === pid );
            setCatalog(data);
        }
        fillter(pid);

    }, []);

    // 좋아요 버튼 클릭 이벤트
    const toggleWish = () => {
        setIsWished(prev => !prev);
    };

    // 구매 수량 감소 버튼 클릭 이벤트
    const handleDecrease = () => {
        if(count !== 1){
            setCount(count - 1);
        }
    };

    // 구매 수량 증가 버튼 클릭 이벤트
    const handleIncrease = () => {
        if(count < catalog.dc){
            setCount(count + 1);
        }
    };

    // 구매 수량 직접 입력시 이벤트
    const handleChange = (e) => {
        let value = e.target.value;

        // 숫자만 입력
        if (/^\d+$/.test(value)) {
            // 숫자로 value값 설정
            value = Number(value);

            // 1미만을 입력할 경우 1설정
            if (value < 1) {
                value = 1;
            } 
            // 최대 갯수를 초과할 경우 최대치 설정
            else if (value > catalog.dc) {
                value = catalog.dc;
            }

            setCount(value);
        }
    };

    // 탭 화면 표시용
    const tabLables = ["속성정보", "상세정보", "구매후기", "상품문의", "배송/반품/교환정보"];
    // 탭 초기 설정
    const [tabName, setTabName] = useState("detail");
    // 탭 이벤트용 변수명
    const tabEventNames = ['item','detail', 'review', 'qna', 'return']
    
    // 화면 표시용 가격 표시 : 9,999원
    const price = parseInt(catalog.price).toLocaleString() + "원";
    // 화면 표시용 할인가 : 9,999원
    const dc = parseInt(catalog.price/catalog.dc).toLocaleString() + "원";
    // 화면 표시용 할인가 적용 가격 : 9,999원
    const salesPrice = (parseInt(catalog.price) - parseInt(catalog.price/catalog.dc)).toLocaleString() + "원";

    return (
        <div className='content'>
            <div className='catalog'>
                <div className='catelog-detail'>
                    <div className='catelog-detail-img'>
                        <img src={catalog.imageUrl} alt={catalog.imageUrl_name} className='catelog-detail-img-main'/>
                        {/* <ImageList imgList={imgList} className="catelog-detail-img-main-list"/> */}
                    </div>
                    <div className='catelog-detail-list'>
                        {/* delivery |  클릭시 해당 브랜드로 검색 */}
                        <div className='catelog-detail-list-sales-price'>{}{catalog.brandName}</div>
                        <div className='catelog-detail-list-title'>[{catalog.brandName}]{catalog.productName}</div> {/** 상품명 */}
                        {/** 할인시 정보 */}
                        <div className='catelog-detail-list-sales redcolor'>{dc} 할인
                            <span className='catelog-detail-list-sales-price line-through'>{price}</span></div> {/** 할인 금액 */}
                        <div className='catelog-detail-list-price'>{salesPrice}</div> {/** 단가 price parseInt(catalog.price).toLocaleString() + "원"*/}
                        <div className='catelog-detail-list-sales redcolor'>행사 기간 2025-09-10 ~ 2025-10-20</div> {/** 할인 행사 기간 */}
                        <hr/>
                        <ul className='catelog-detail-info'>
                            <li>상품번호</li>
                            <li>{catalog.pid}</li> {/** 상품 번호 */}
                        </ul>
                        <ul className='catelog-detail-info'>
                            <li>배송</li>
                            <li>샛별배송</li> {/** delivery */}
                        </ul>
                        <ul className='catelog-detail-info'>
                            <li>판매자</li>
                            <li>컬리</li> {/** seller */}
                        </ul>
                        <ul className='catelog-detail-info'>
                            <li>포장타입</li>
                            <li>냉동(종이포장)</li> {/** sellType */}
                        </ul>
                        <ul className='catelog-detail-info'>
                            <li>판매단위</li>
                            <li>1팩</li> {/** count */}
                        </ul>
                        <ul className='catelog-detail-info'>
                            <li>중량/용량</li>
                            <li>1KG</li> {/** weight */}
                        </ul>
                        <ul className='catelog-detail-info'>
                            <li>알레르기정보</li>
                            <li>소고리,대두,밀</li> {/** alrege */}
                        </ul>
                        <ul className='catelog-detail-info'>
                            <li>안내사항</li>
                            <li>{catalog.description}</li> {/** tax */}
                        </ul>
                        <hr/>
                        <div className='catelog-detail-sales'>
                            <ul className='catelog-detail-sales-info'>
                                <li>수량 <span>(최소구매수량 1개)</span></li>
                                <li>
                                    <div className='catelog-detail-info123'>
                                        <button className='catelog-detail-info-button' onClick={handleDecrease}>-</button>
                                        <input
                                            className='catalog-detail-info-text'
                                            type='text'
                                            value={count}
                                            onChange={handleChange}
                                            style={{ width: '50px' }}
                                        />
                                    <button className='catelog-detail-info-button' onClick={handleIncrease}>+</button>
                                    </div>
                                </li>
                            </ul>
                            <ul className='catelog-detail-sales-info'>
                                <li>총금액 <span>(부가세포함)</span></li>
                                <li>30,000원</li>
                            </ul>
                        </div>
                        <button className='catelog-detail-buybutton'>구매버튼</button>
                        <div className='catelog-detail-subbuttons'>
                            <button
                                className={`catelog-detail-wishbutton ${isWished ? 'active' : ''}`}
                                onClick={toggleWish}
                            >
                                {isWished ? <AiFillHeart size={20}/> : <AiOutlineHeart size={20}/>}
                            </button>
                            <button className='catelog-detail-cartbutton'>장바구니</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='catelog-detail-tabs'>
                <ul className='catelog-detail-tab'>{
                        tabLables && tabLables.map( (lable, i) =>
                            <li className={tabName=== tabEventNames[i] ? "active": ""}>
                                <button type='button'
                                        onClick={ () => setTabName(tabEventNames[i])}>{lable}</button>
                            </li> 
                        )
                    }
                </ul>
                { tabName === "itme" ? ""
                    : tabName === "detail" ? ""  
                    : tabName === "review" ? ""
                    : tabName === "qna" ? ""
                    : tabName === "return"}
            </div>
            <div style={{marginBottom:"50px"}}></div>
        </div>
    );
}