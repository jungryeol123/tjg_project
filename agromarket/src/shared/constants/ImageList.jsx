export function ImageList({imgList, className}) {
    return (
        <ul className={className}>
            {imgList && imgList.map( img => 
                <li>
                    <img src={img} />
                </li>)}
        </ul>
    );
}
