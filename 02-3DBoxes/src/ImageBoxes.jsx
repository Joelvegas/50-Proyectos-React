import { useState } from "react"

export function ImgBoxes () {
    const [magic, setMagic] = useState(false)

    const handleClick = () => {
        setMagic(!magic)
    }

    const createBoxes = () => {
        const boxes = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const position = `${-j * 125}px ${-i * 125}px`;
            boxes.push(<Box key={`${i}-${j}`} position={position} />);
          }
        }
        return boxes;
      };

    return (
        <div>
            <div id="boxes" className={magic ? 'big' : ''}>
                {createBoxes()}
            </div>
            <button id="btn" onClick={handleClick}>Toggle Size</button>
        </div>
      );
}