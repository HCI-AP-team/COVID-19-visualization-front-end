import {
  LayerEvent,
  LineLayer,
  MapboxScene,
  PointLayer,
  PolygonLayer,
  Popup,
} from '@antv/l7-react';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import areaData from '../../../assets/areaData'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  mapBg: {
    height: '70vh',
    width: '80vw',
    position: 'relative',
    backgroundColor: 'skyblue'
  }
});
function joinData(geodata: any, ncovData: any) {
  const ncovDataObj: any = {};
  ncovData.forEach((item: any) => {
    const {
      countryName,
      countryEnglishName,
      currentConfirmedCount,
      confirmedCount,
      suspectedCount,
      curedCount,
      deadCount,
    } = item;
    if (countryName === '中国') {
      if (!ncovDataObj[countryName]) {
        ncovDataObj[countryName] = {
          countryName: 0,
          countryEnglishName,
          currentConfirmedCount: 0,
          confirmedCount: 0,
          suspectedCount: 0,
          curedCount: 0,
          deadCount: 0,
        };
      } else {
        ncovDataObj[countryName].currentConfirmedCount += currentConfirmedCount;
        ncovDataObj[countryName].confirmedCount += confirmedCount;
        ncovDataObj[countryName].suspectedCount += suspectedCount;
        ncovDataObj[countryName].curedCount += curedCount;
        ncovDataObj[countryName].deadCount += deadCount;
      }
    } else {
      ncovDataObj[countryName] = {
        countryName,
        countryEnglishName,
        currentConfirmedCount,
        confirmedCount,
        suspectedCount,
        curedCount,
        deadCount,
      };
    }
  });
  const geoObj: any = {};
  geodata.features.forEach((feature: any) => {
    const { name } = feature.properties;
    geoObj[name] = feature.properties;
    const ncov = ncovDataObj[name] || {};
    feature.properties = {
      ...feature.properties,
      ...ncov,
    };
  });
  return geodata;
}

const World = React.memo(function Map(props: any) {
  const classes = useStyles();
  const { language, areaData, world2D } = props;
  const [data, setData] = React.useState();
  const [filldata, setfillData] = React.useState();
  const [popupInfo, setPopupInfo] = React.useState<{
    lnglat: number[];
    feature: any;
  }>();
  React.useEffect(() => {

    // const [geoData, ncovData] = await Promise.all([
    //   fetch(
    //     'https://gw.alipayobjects.com/os/bmw-prod/e62a2f3b-ea99-4c98-9314-01d7c886263d.json',
    //   ).then((d) => d.json()),
    //   fetch('https://lab.isaaclin.cn/nCoV/api/area?latest=1').then((d) =>
    //     d.json(),
    //   ),
    // ]);


  
  if (areaData && world2D) {
    const geoData = world2D
    const ncovData = areaData;



    const worldData = joinData(geoData, ncovData.results);
    const pointdata = worldData.features.map((feature: any) => {
      return feature.properties;
    });
    setfillData(worldData)
    setData(pointdata)
  }

}, [areaData, world2D]);
function showPopup(args: any): void {
  setPopupInfo({
    lnglat: args.lngLat,
    feature: args.feature,
  });
}

return (
  <div className={classes.root}>
    <h1>{language ? '世界概况(支持缩放和拖动)' : 'World Factbook (supports zooming and dragging)'} </h1>
    <div className={classes.mapBg}>
      <MapboxScene
        map={{
          center: [110.19382669582967, 50.258134],
          pitch: 0,
          style: 'blank',
          zoom: 1,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {popupInfo && (
          <Popup lnglat={popupInfo.lnglat}>
            {language ? popupInfo.feature.name : popupInfo.feature.countryEnglishName}
            <ul
              style={{
                margin: 0,
              }}
            >
              <li>{(language ? '现有确诊: ' : 'current confirm: ') + popupInfo.feature.currentConfirmedCount}</li>
              <li>{(language ? '累计确诊: ' : 'total confirm: ') + popupInfo.feature.confirmedCount}</li>
              <li>{(language ? '治愈: ' : 'cure count: ') + popupInfo.feature.curedCount}</li>
              <li>{(language ? '死亡: ' : 'dead count: ') + popupInfo.feature.deadCount}</li>
            </ul>
          </Popup>
        )}
        {data && [
          <PolygonLayer
            key={'1'}
            options={{
              autoFit: false,
            }}
            source={{
              data: filldata,
            }}
            scale={{
              values: {
                confirmedCount: {
                  type: 'quantile',
                },
              },
            }}
            color={{
              values: '#bbb',
            }}
            shape={{
              values: 'fill',
            }}
            style={{
              opacity: 1,
            }}
          />,
          <LineLayer
            key={'3'}
            source={{
              data: filldata,
            }}
            size={{
              values: 0.6,
            }}
            color={{
              values: '#89f',
            }}
            shape={{
              values: 'line',
            }}
            style={{
              opacity: 1,
            }}
          />,
          <PointLayer
            key={'2'}
            options={{
              autoFit: true,
            }}
            source={{
              data,
              parser: {
                type: 'json',
                coordinates: 'centroid',
              },
            }}
            scale={{
              values: {
                confirmedCount: {
                  type: 'log',
                },
              },
            }}
            color={{
              values: '#b10026',
            }}
            shape={{
              values: 'circle',
            }}
            active={{
              option: {
                color: '#0c2c84',
              },
            }}
            size={{
              field: 'confirmedCount',
              values: [5, 60],
            }}
            animate={{
              enable: true,
            }}
            style={{
              opacity: 0.6,
            }}
          >
            <LayerEvent type="mousemove" handler={showPopup} />
          </PointLayer>,
        ]}
      </MapboxScene>
    </div>
  </div>
);
});
export default World;