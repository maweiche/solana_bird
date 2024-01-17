// Bird.js
import React from "react";

const Bird = ({ birdPosition }) => {
	// get the image from the local storage "selectedNft"
	const imageUrl = localStorage.getItem("selectedNft");
	return (
		<img
			src={imageUrl ? imageUrl : "https://media.geeksforgeeks.org/wp-content/uploads/20231211115925/flappy_bird_by_jubaaj_d93bpnj.gif"}
			alt="bird"
			className="bird"
			style={{
				left: birdPosition.x,
				top: birdPosition.y,
				transform: birdPosition.rotation,
			}}
			draggable={true}
		/>
	);
};

export default Bird;
