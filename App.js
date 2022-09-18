import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import react,{useEffect,useState} from 'react';
const getRemaining=(time)=>
{
  const mins=Math.floor(time/60)
  const secs=time-mins*60
  return { mins , secs }
}
export default function App() {
  const screen=Dimensions.get('screen')
  const[remainingSec,setRemainingSec]=useState(0)
  const [isActive,setIsActive]=useState(false)
  const { mins , secs}=getRemaining(remainingSec)
 
 const toggle=()=>
  {
    setIsActive(!isActive)
  }

  useEffect(()=>
  {
    let interval=null
    if (isActive)
    {
      interval=setInterval(()=>setRemainingSec(remainingSec=>remainingSec+1),1000)
    }
    else if(!isActive && remainingSec!== 0){
      clearInterval(interval)
    }
    return ()=>clearInterval(interval)
  },[isActive,remainingSec])




  return (
    <View style={styles.container}>
    
      <StatusBar style="auto" />
      <Text style={styles.TimeText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.Button}>
         <Text style={styles.ButtonText}>{isActive? "توقف" : "شروع" }</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07120B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button : {
    borderWidth:10,
    borderColor:"#fca503",
    width:screen.width/2,
    height:screen.width/2,
    borderRadius:screen.width/2,
    alignItems:"center",
    justifyContent:"center"
  },
  ButtonText:
  {
    fontSize:35,
    color:"#fca503"
  },
  TimeText:{
    fontSize:90,
    color:'#fff',
    marginBottom:10
  }
});
