import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
// import { ImageList } from '../components/commons/ImageList.jsx';
// import { StarRating } from '../components/commons/StarRating.jsx';
// import { Detail } from '../components/detailTabs/Detail.jsx';
// import { Review } from '../components/detailTabs/Review.jsx';
// import { QnA } from '../components/detailTabs/QnA.jsx';
// import { Return } from '../components/detailTabs/Return.jsx';
import { getJsonData } from '../shared/ui/axiosData.js'
import { ImageList } from '../shared/constants/ImageList.jsx';

export function ProductDetail() {
    const pid = "1"; // 선택한 상품의 상품번호(primarykey)
    const [catalog, setCatalog] = useState({}); // 선택한 상품 정보
    const [imgList, setImgList] = useState([]); // 선택한 상품의 이미지 리스트
    const [isWished, setIsWished] = useState(false); // 찜 상태 관리

    useEffect( () => {
        const fillter = async () => {
            const jsonData = await getJsonData("/data/data.json");
            const [fdata] = await jsonData.filter( data => data.pid === pid);
        
            setCatalog(fdata);
            setImgList(fdata.imgList);
        }
        fillter();

    }, [pid]);

    const toggleWish = () => {
        setIsWished(prev => !prev);
    };
    
    const tabLables = ["속성정보", "상세정보", "구매후기", "상품문의", "배송/반품/교환정보"];
    const [tabName, setTabName] = useState("detail");
    const tabEventNames = ['item','detail', 'review', 'qna', 'return']
    
    const price = parseInt(catalog.price).toLocaleString() + "원";

    return (
        <div className='content'>
            <div className='catalog'>
                <div className='catelog-detail'>
                    <div className='catelog-detail-img'>
                        <img src={catalog.image} alt={catalog.info} className='catelog-detail-img-main'/>
                        <ImageList imgList={imgList} className="catelog-detail-img-main-list"/>
                    </div>
                    <div className='catelog-detail-list'>
                        <div className='catelog-detail-list-title'>[사미헌]갈비탕</div> {/** 상품명 */}
                        {/** 할인시 정보 */}
                        <div className='catelog-detail-list-sales redcolor'>300원 할인
                             <span className='catelog-detail-list-sales-price'>30,000원</span></div> {/** 할인 금액 */}
                        <div className='catelog-detail-list-price'>30,000원</div> {/** 단가 price parseInt(catalog.price).toLocaleString() + "원"*/}
                        <div className='catelog-detail-list-sales redcolor'>행사 기간 2025-09-10 ~ 2025-10-20</div> {/** 할인 행사 기간 */}
                        <hr/>
                        <ul className='catelog-detail-info'>
                            <li>상품번호</li>
                            <li>P251015-000422</li> {/** 상품 번호 */}
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
                            <li>뼈조각 있을수 있음</li> {/** tax */}
                        </ul>
                        <hr/>
                        <div className='catelog-detail-sales'>
                            <ul className='catelog-detail-sales-info'>
                                <li>수량 <span>(최소구매수량 1개)</span></li>
                                <li>
                                    <div className='catelog-detail-info123'>
                                        <button className='catelog-detail-info-button'>-</button>
                                        <input className='catalog-detail-info-text' type='text' style={{width:"50px"}}/>
                                        <button className='catelog-detail-info-button'>+</button>
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
                {/* { tabName === "itme" ? <Item />
                    : tabName === "detail" ? <Detail imgList={imgList} detailInfo={product.detailInfo}/> 
                    : tabName === "review" ? <Review />
                    : tabName === "qna" ? <QnA />
                    : <Return />} */}
            </div>
            <div style={{marginBottom:"50px"}}></div>
        </div>
    );
}