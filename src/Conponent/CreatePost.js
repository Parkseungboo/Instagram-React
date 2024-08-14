import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
import app from './firebase'; 
import { useNavigate } from 'react-router-dom';

const { daum } = window;

function CreatePost() {
    const db = getFirestore(app);
    const navigate = useNavigate();

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new daum.maps.LatLng(37.537187, 127.005476),
            level: 5
        };

        const map = new daum.maps.Map(container, options);
        const geocoder = new daum.maps.services.Geocoder();
        const marker = new daum.maps.Marker({
            position: new daum.maps.LatLng(37.537187, 127.005476),
            map: map
        });

        const execDaumPostcode = () => {
            new daum.Postcode({
                oncomplete: function(data) {
                    const addr = data.address;
                    document.getElementById("CreatePostPlace").value = addr;
                    geocoder.addressSearch(addr, function(results, status) {
                        if (status === daum.maps.services.Status.OK) {
                            const result = results[0];
                            const coords = new daum.maps.LatLng(result.y, result.x);
                            container.style.display = "block";
                            map.relayout();
                            map.setCenter(coords);
                            marker.setPosition(coords);
                        }
                    });
                }
            }).open();
        };

        // Attach the function to the button's onclick event
        document.getElementById("CreatePostPlaceButton").onclick = execDaumPostcode;
    }, []);

    return (
        <div>
            <h3>제목</h3>
            <input type="text" id="CreatePostTitle" />
            <h3>장소</h3>
            <input type="text" id="CreatePostPlace" placeholder="주소" />
            <input type="button" value="주소 검색" id="CreatePostPlaceButton" />
            <div id="map" style={{ width: '300px', height: '300px', marginTop: '10px', display: 'none' }}></div>

            <h3>내용</h3>
            <input type="text" id="CreatePost" />
        </div>
    );
}

export default CreatePost;
