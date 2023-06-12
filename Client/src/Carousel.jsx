import { Carousel } from 'antd';
const contentStyle = {



};
const Carousel1 = () => (
  <Carousel autoplay effect="fade">
    <div style={{ backgroundColor: '#dcdde5' }}>

      <img style={{ display: 'inherit' }} width='450px' height='300px' src='https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg'></img>

    </div>
    <div>
      <img style={{ display: 'inherit' }} width='450px' height='300px' src='https://cdn.britannica.com/36/4036-050-37052A78/Flag-Singapore.jpg'></img>

    </div>
    <div>
      <img style={{ display: 'inherit' }} width='450px' height='300px' src='https://cdn.britannica.com/13/4413-050-98188B5C/Flag-Sri-Lanka.jpg'></img>

    </div>

    <div>
      <img style={{ display: 'inherit' }} width='450px' height='300px' src='https://cdn.britannica.com/90/7490-050-5D33348F/Flag-China.jpg'></img>
    </div>

    <div>
      <img style={{ display: 'inherit' }} width='450px' height='300px' src='https://cdn.britannica.com/31/4031-050-A6FEE261/Flag-Malaysia.jpg'></img>
    </div>

    <div>
      <img style={{ display: 'inherit' }} width='450px' height='300px' src='https://cdn.britannica.com/73/3473-050-3A33E719/Flag-Philippines.jpg'></img>
    </div>


  </Carousel>
);
export default Carousel1;