import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import app from './firebase'; 
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
import styles from '../styles/Main.module.css'

function Main() {
    const location = useLocation();     // 현재 페이지의 URL에 관한 정보를 가져옵니다.
    const navigate = useNavigate();     // 페이지를 프로그램적으로 이동시키는 데 사용되는 훅입니다.
    const { email } = location.state || {};  // location.state에서 email을 가져오거나, 없으면 빈 객체를 반환합니다.
    const db = getFirestore(app);       // Firestore 데이터베이스 인스턴스를 가져옵니다.

    const [products, setProducts] = useState([]); // 제품 데이터를 저장할 상태

    useEffect(() => {
        if (!email) {
            // 만약 email 값이 없으면, SignIn 페이지로 리다이렉트합니다.
            navigate('/Signin');
            return; // 리다이렉트 후 아래 코드를 실행하지 않도록 함.
        }

        // Firestore에서 제품 데이터를 가져오는 함수
        const fetchProducts = async () => {
            const productCollection = collection(db, 'product');  // Firestore의 'product'라는 이름의 컬렉션을 참조합니다.
            const productSnapshot = await getDocs(productCollection); // 'product' 컬렉션에서 모든 문서를 가져옵니다.
            const productList = productSnapshot.docs.map(doc => ({   // 각 문서의 고유한 ID를 가져오고 데이터를 저장합니다.
                id: doc.id,
                name: doc.data().이름,
                price: doc.data().가격
            }))
            // .filter(product => product.name === '컴퓨터');        // 이름이 '컴퓨터'인 제품만 필터링합니다.
            setProducts(productList); // 가져온 데이터를 상태로 저장합니다.
        };

        fetchProducts(); // Firestore에서 제품 데이터를 가져오는 함수를 호출합니다.
    }, [db, email, navigate]); // db와 email, navigate가 변경될 때마다 이 useEffect가 실행됨

    return (
        <div className={styles.Main}>
            <h1>Instagram</h1>
            {/* 왼쪽 상단 메뉴 */}
            <div className="LeftNav">
                <input type="button" value="홈" id="HomeButton" onClick={() => {
                    console.log({ email }); // 이메일 값을 콘솔에 출력합니다.
                    navigate('/Main', { state: { email } }); // '/Main' 경로로 이동하면서 이메일 정보를 전달합니다.
                }}  />
                <input type="button" value="검색" id="HomeButton"/>
                <input type="button" value="탐색 탭" id="HomeButton"/>
                <input type="button" value="릴스" id="HomeButton"/>
                <input type="button" value="메세지" id="HomeButton"/>
                <input type="button" value="알림" id="HomeButton"/>
                <input type="button" value="만들기" id="HomeButton"/>
                <input type="button" value="프로필" id="ProfileButton" onClick={() => {
                    navigate('/Profile', { state: { email }});
                }} />
            </div>

            <div className="middleContent">
                <div className="MainContents">
                    {/* 제품 데이터를 렌더링 */}
                    {products.map((product) => (
                        <div key={product.id}>
                            <h1>{email}</h1>
                            {product.name || '이름 없음'} - {product.price || '가격 정보 없음'}
                        </div>
                    ))}
                </div>
            </div>
            {email && <h2>환영합니다, {email}</h2>}
        </div>
    );
}

export default Main;