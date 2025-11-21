import {StyleSheet} from 'react-native';

const GlobalCss = StyleSheet.create({
  inputContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: '#fff',
    // borderRadius: 5,
    // width:"90%",
    // alignSelf:"center",
    // marginBottom:20
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'graey',
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 18,
  },
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 14,
    color: 'black',
    borderRadius: 50,
    backgroundColor: '#f9f9f9',
  },

  changebutton: {
    // flex:1,
    width: '70%',
  },
  button: {
    alignSelf: 'center',
    width: '70%',
  },
  loginButton: {
    backgroundColor: '#FDD26A',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  disbleLogin: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionbutton: {
    backgroundColor: '#00CF00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  actionbutton_cancel: {
    backgroundColor: '#C70039',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },

  actionButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  loginButtonText: {
    color: '#2B2412',
    fontWeight: '600',
    fontSize: 18,
  },
  back: {
    height: '100%',
    color: 'fff',
  },
  image_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  headerTxt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 40,
  },

  smallButton: {
    width: 120,
    padding: 10,
    backgroundColor: '#FDD26A',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'flex-end',
  },
  smallButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default GlobalCss;
