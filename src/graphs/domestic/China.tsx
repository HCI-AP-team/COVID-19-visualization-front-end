import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react'
import { Scene, GaodeMap, LineLayer, PolygonLayer } from '@antv/l7'
import data from '../../tempData/ChinaMap';
import red from '@material-ui/core/colors/red';
import { translate } from '@antv/g2/lib/util/transform';
const useStyles = makeStyles({

})
function China() {
  // useEffect(() => {
  //   const chinaLayer = new PolygonLayer({
  //     autoFit: true
  //   })
  //     .source(data)
  //     .shape("fill")
  //     .color("confirm", (d) => {
  //       return d > 1000 ? red[900] :
  //         d > 499 ? red[700] :
  //           d > 100 ? red[500] :
  //             d > 10 ? red[300] :
  //               d > 0 ? red[100] :
  //                 red[50];
  //     })
  //     .style({
  //       opacity: 1
  //     });
  //   const chinaLine = new LineLayer({})
  //     .source(data)
  //     .size(0.5)
  //     .shape("line")
  //     .color("#222")
  //     .style({
  //       opacity: 1
  //     });
  //   const scene = new Scene({
  //     id: "map",
  //     map: new GaodeMap({
  //       center: [112.3956, 34.9392],
  //       doubleClickZoom: false,
  //       pitch: 0,
  //       zoom: 4,
  //       rotation: 0,
  //       style: "dark"
  //     })
  //   });
  //   scene.addLayer(chinaLayer);
  //   scene.addLayer(chinaLine);
  //   scene.render();
  // })
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      这个页面用来写全国概览
      <div id="map" style={{height:'80%',width:'80%',transform:'translateY(100vh)'}}>

      </div>
    </div>
  )
}

export default China
