import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Image, ImageBackground, Animated, Dimensions, Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../components/LanguageContext';
import { translations } from '../constants/translations';
import ContactForm from '../components/ContactForm';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
// import { LogBox } from 'react-native';

// LogBox.ignoreAllLogs(); // Optional - to ignore unwanted warnings




// // import { useNavigation } fromconst YourComponent = () => {
//   const YourComponent = () => {
//     const navigation = useNavigation();
//   }



// Animation component wrapper
const AnimatedItem = ({ children, index = 0, scrollY }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [hasAnimated, setHasAnimated] = useState(false);
  

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      // Trigger animation when component is about to enter viewport
      const triggerPoint = 100 + (index * 50);
      
      if (value > triggerPoint && !hasAnimated) {
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          setHasAnimated(true);
        });
      }
    });
    
    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY, animatedValue, index, hasAnimated]);
  
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });
  
  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  
  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};

// Testimonial Card Component with Fade Animation
const TestimonialCard = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Change testimonial
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const currentTestimonial = testimonials[currentIndex];
  
  return (
    <Animated.View style={[styles.testimonialCard, { opacity: fadeAnim }]}>
      <View style={styles.testimonialHeader}>
        <Image 
          source={{ uri: currentTestimonial.avatar }} 
          style={styles.testimonialAvatar} 
        />
        <View>
          <Text style={styles.testimonialName}>{currentTestimonial.name}</Text>
          <Text style={styles.testimonialRelation}>{currentTestimonial.relation}</Text>
        </View>
      </View>
      <View style={styles.testimonialDivider} />
      <Text style={styles.testimonialText}>"{currentTestimonial.text}"</Text>
    </Animated.View>
  );
};

// Action Button Component
const ActionButton = ({ icon, title, onPress, style }) => (
  <TouchableOpacity style={[styles.actionButton, style]} onPress={onPress}>
    <Image source={{ uri: icon }} style={styles.actionButtonIcon} />
    <Text style={styles.actionButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const navigation = useNavigation(); // ✅ Add it here, just after export default

  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [expanded, setExpanded] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );
  
  // Testimonials data
  const testimonials = [
    // English Testimonials
    {
      id: 1,
      name: "Priya Sharma",
      relation: "Mother of Arjun, 8",
      text: "The foundation has been a blessing for our family. My son has shown remarkable improvement in his social skills and confidence.",
      avatar: "https://api.a0.dev/assets/image?text=PS&background=4A90E2&foreground=FFFFFF&width=200&height=200",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      relation: "Father of Meera, 6",
      text: "The therapists here understand my daughter's needs perfectly. The personalized attention has made all the difference.",
      avatar: "https://api.a0.dev/assets/image?text=RK&background=E74C3C&foreground=FFFFFF&width=200&height=200",
    },
  
    // Malayalam Testimonial
    {
      id: 3,
      name: "അജിത് നായർ",
      relation: "അനു, 9-ന്‍റെ അച്ഛൻ",
      text: "ഫൗണ്ടേഷൻ ഞങ്ങളുടെ കുടുംബത്തിനൊരു അനുഗ്രഹമായി മാറി. എന്റെ മകൻ സാമൂഹ്യജ്ഞാനവും ആത്മവിശ്വാസവും വളർത്തിയെടുത്തിട്ടുണ്ട്.",
      avatar: "https://api.a0.dev/assets/image?text=AN&background=E74C3C&foreground=FFFFFF&width=200&height=200",
    },
  
    // Hindi Testimonial
    {
      id: 4,
      name: "सुनीता गुप्ता",
      relation: "अभय, 7 के माता-पिता",
      text: "फाउंडेशन ने मेरे बेटे को आत्मविश्वास और सामाजिक कौशल में बहुत सुधार दिया है। यह हमारे परिवार के लिए एक वरदान साबित हुआ है।",
      avatar: "https://api.a0.dev/assets/image?text=SG&background=F1C40F&foreground=FFFFFF&width=200&height=200",
    },
  
    // Kannada Testimonials
    {
      id: 5,
      name: "ಮಹೇಶ್ ಗೌಡ",
      relation: "ಅನುಷ, 8 ರ ತಂದೆ",
      text: "ಈ ಸ್ಥಾಪನೆಯು ನಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಆಶೀರ್ವಾದವಾಗಿದೆ. ನನ್ನ ಮಗಳು ಶೀಘ್ರವಾಗಿ ಸಮಾಜದಲ್ಲಿ ಶಿಸ್ತು ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸವನ್ನು ಬೆಳೆಸಿದ್ದಾಳೆ.",
      avatar: "https://api.a0.dev/assets/image?text=MG&background=F39C12&foreground=FFFFFF&width=200&height=200",
    },
    {
      id: 6,
      name: "ರೇಖಾ ಶೆಟ್ಟಿ",
      relation: "ಆದಿತ್ಯ, 10 ರ ತಾಯಿ",
      text: "ಇಲ್ಲಿ ನಾವು ತೊಡಗಿಸಿಕೊಂಡಿರುವ ಬದ್ಧತೆಯು ನಮ್ಮ ಮಗನ ಬೆಳವಣಿಗೆಯಲ್ಲಿ ಮಹತ್ವದ ಪ್ರಭಾವವನ್ನು ಉಂಟುಮಾಡಿದೆ.",
      avatar: "https://api.a0.dev/assets/image?text=RS&background=9B59B6&foreground=FFFFFF&width=200&height=200",
    },
  ];
  
  
  // Action buttons data
  const actionButtons = [
    {
      id: 1,
      title: t.donate,
      // icon: require('../assets/images/donate.png'), // Use require() here
      onPress: () => console.log("Donate pressed"),
    },
    {
      id: 2,
      title: t.volunteer,
      // icon: require('../assets/images/volun.png'), // Use require() here
      onPress: () => console.log("Volunteer pressed"),
    },
    {
      id: 3,
      title: t.intern,
      // icon: require('../assets/images/intern.png'), // Use require() here
      onPress: () => console.log("Intern pressed"),
    },
  ];
  
  
  const openMap = () => {
    Linking.openURL('https://www.google.com/maps?ll=12.913538,77.594656&z=15&t=m&hl=en-GB&gl=US&mapclient=embed&cid=10838468200464020233');
  };

  return (
    <ImageBackground
    source={require('../assets/images/1.png')} 
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView 
          style={styles.scrollView}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Language Selector */}
          <AnimatedItem scrollY={scrollY} index={0}>
            <View style={styles.languageSelector}>
              <Picker
                selectedValue={language}
                onValueChange={(value) => setLanguage(value)}
                style={styles.picker}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="हिंदी" value="hi" />
                <Picker.Item label="ಕನ್ನಡ" value="kn" />
                <Picker.Item label="தமிழ்" value="ta" />
              </Picker>
            </View>
          </AnimatedItem>

          {/* Header */}
          <AnimatedItem scrollY={scrollY} index={1}>
          <View style={styles.header}>
  <View style={styles.logoContainer}>
    <Image
      source={require('../assets/images/logo.png')}
      style={styles.logo}
    />
  </View>
  <Text style={[styles.foundationName, { fontFamily: 'JosefinSans-Regular', fontSize: 50 }]}>
    {t.foundation_name}
  </Text>
</View>


          </AnimatedItem>

          {/* Quote Section */}
          <AnimatedItem scrollY={scrollY} index={2}>
            <View style={styles.quoteSection}>
              <View style={{
                backgroundColor: '#F5F5F5',
                padding: 20,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 20,
                width: '90%',
                alignSelf: 'center',
              }}>
                {/* Quote Text */}
                <Text style={{
                  fontFamily: 'JosefinSans-Bold',
                  fontSize: 21,
                  textAlign: 'center',
                  color: '#333',
                  marginBottom: 5,
                }}>
                  DISABILITY IS
                </Text>
                <Text style={{
                  fontFamily: 'JosefinSans-Regular',
                  fontSize: 18,
                  textAlign: 'center',
                  color: '#333',
                  marginBottom: 5,
                }}>
                  THE INABILITY TO
                </Text>
                <Text style={{
                  fontFamily: 'JosefinSans-Bold',
                  fontSize: 21,
                  textAlign: 'center',
                  color: '#333',
                  marginBottom: 15,
                }}>
                  SEE ABILITY
                </Text>

                {/* Illustration Container */}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  width: '100%',
                }}>
                  {/* Puzzle Image */}
                  <Image
                    source={{
                      uri: 'https://api.a0.dev/assets/image?text=colorful%20puzzle%20pieces%20hands%20connecting%20illustration&aspect=1:1',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                  {/* Bubbles Image */}
                  <Image
                    source={require('../assets/images/img1.png')} 
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </View>
            </View>
          </AnimatedItem>

          

          {/* Main Action Buttons */}
          <AnimatedItem scrollY={scrollY} index={4}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={[styles.buttonText, { fontFamily: 'JosefinSans-Bold', fontSize: 21 }]}>
                  {t.browse_programs}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('RegistrationForm')} // ✅ Correct usage here
        >
          <Text style={[styles.buttonText, { fontFamily: 'JosefinSans-Bold', fontSize: 21 }]}>
            {t.schedule_appointment}
          </Text>
        </TouchableOpacity>
              <TouchableOpacity style={styles.once}>
                <Text style={[styles.buttonText, { fontFamily: 'JosefinSans-Bold', fontSize: 21 }]}>
                  {t.parent_login}
                </Text>
              </TouchableOpacity>
            </View>
          </AnimatedItem>

          {/* About Us Section */}
          <AnimatedItem scrollY={scrollY} index={5}>
            <View style={styles.aboutSection}>
              <Text
                style={[
                  styles.aboutTitle,
                  { fontFamily: 'JosefinSans-Bold', fontSize: 30 },
                ]}
              >
                {t.about_us}
              </Text>

              <Text
                style={[
                  styles.aboutText,
                  { fontFamily: 'JosefinSans-Regular', fontSize: 18 },
                ]}
                numberOfLines={expanded ? undefined : 3}
              >
                {t.about_content}
              </Text>

              <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Text style={styles.readMore}>
                  {expanded ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            </View>
          </AnimatedItem>

          {/* Parent Diaries Section */}
          <AnimatedItem scrollY={scrollY} index={6}>
            <View style={styles.parentDiariesSection}>
              <Text style={styles.parentDiariesTitle}>Parent Diaries</Text>
              <TestimonialCard testimonials={testimonials} />
            </View>
          </AnimatedItem>
          
          {/* Action Buttons (Donate, Volunteer, Intern) */}
          <AnimatedItem scrollY={scrollY} index={3}>
            <View style={styles.actionButtonsContainer}>
              {actionButtons.map((button) => (
                <ActionButton
                
                  key={button.id}
                  // icon={button.icon}
                  title={button.title}
                  onPress={button.onPress}
                />
              ))}
            </View>
          </AnimatedItem>

          {/* Map Section */}
          <AnimatedItem scrollY={scrollY} index={7}>
            <View style={styles.mapSection}>
              <Text style={styles.mapTitle}>{t.find_us}</Text>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 12.913538,
                    longitude: 77.594656,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: 12.913538,
                      longitude: 77.594656,
                    }}
                    title="Ishanya Foundation"
                    description="Empowering special needs children"
                  />
                </MapView>
                <TouchableOpacity style={styles.mapButton} onPress={openMap}>
                  <Text style={styles.mapButtonText}>Open in Google Maps</Text>
                </TouchableOpacity>
              </View>
            </View>
          </AnimatedItem>

          {/* Contact Form - Enhanced Footer Style */}
          <AnimatedItem scrollY={scrollY} index={8}>
            <View style={styles.footerSection}>
              {/* <Text style={styles.footerTitle}>Contact Us</Text> */}
              <ContactForm />
              <View style={styles.footerInfo}>
                <Text style={styles.footerInfoText}>Ishanya Foundation</Text>
                <Text style={styles.footerInfoText}>123 Harmony Road, Bangalore</Text>
                <Text style={styles.footerInfoText}>Phone: +91 98765 43210</Text>
                <Text style={styles.footerInfoText}>Email: info@ishanyafoundation.org</Text>
              </View>
              <Text style={styles.copyright}>© 2023 Ishanya Foundation. All Rights Reserved.</Text>
            </View>
          </AnimatedItem>
        </Animated.ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  languageSelector: {
    margin: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  once: {
    backgroundColor: '#408c4c',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  picker: {
    height: 50,
    fontFamily: 'Josefin Sans',
    borderRadius: 12,
  },
  header: {
    alignItems: 'center',
    padding: 25,
  },
  logoContainer: {
    width: 190, // Container width
    height: 160, // Container height
    borderRadius: 80, // Half of width/height for circular shape
    backgroundColor: '#fff', // Optional background
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  logo: {
    width: 190, // Smaller size of logo
    height: 140,
    borderRadius: 60, // Circular shape
  },
  
  foundationName: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 15,
    textAlign: 'center',
    color: '#1D1B44',
  },
  quoteSection: {
    padding: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  quoteContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  quoteText: {
    fontSize: 42,
    fontFamily: 'Josefin Sans',
    fontWeight: '700',
    color: '#1D1B44',
    lineHeight: 48,
    textTransform: 'uppercase',
  },
  readMore: {
    marginTop: 10,
    fontSize: 18,
    color: '#1E90FF',
    fontFamily: 'JosefinSans-Bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  
  // Action Buttons (Donate, Volunteer, Intern)
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginHorizontal: 10,
  },
  actionButton: {
    height:85,
    fontSize:30,
    backgroundColor: '#403c3c',
    borderWidth: 1,
    borderColor: '#FFB800',
    borderRadius: 8,
    // padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 3.6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  actionButtonIcon: {
    width: 30,
    height: 30,
    marginBottom: 8,
    tintColor: '#FFFFFF',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  
  buttonContainer: {
    padding: 25,
    gap: 18,
  },
  button: {
    backgroundColor: '#FFB800',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  secondaryButton: {
    backgroundColor: '#1D1B44',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Josefin Sans',
    fontWeight: '400',
  },
  aboutSection: {
    padding: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  aboutTitle: {
    fontSize: 28,
    fontFamily: 'Josefin Sans',
    fontWeight: '600',
    marginBottom: 20,
    color: '#1D1B44',
  },
  aboutText: {
    fontSize: 17,
    fontFamily: 'Josefin Sans',
    lineHeight: 26,
    color: '#444',
  },
  
  // Parent Diaries Section
  parentDiariesSection: {
    padding: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  parentDiariesTitle: {
    fontSize: 28,
    fontFamily: 'JosefinSans-Bold',
    marginBottom: 20,
    color: '#1D1B44',
    textAlign: 'center',
  },
  testimonialCard: {
    backgroundColor: '#403c3c',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    // Notebook-like styling
    borderLeftWidth: 3,
    borderLeftColor: '#FFB800',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  testimonialAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  testimonialName: {
    color: '#FFFFFF',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 18,
  },
  testimonialRelation: {
    color: '#CCCCCC',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
  },
  testimonialDivider: {
    height: 1,
    backgroundColor: '#555555',
    marginVertical: 10,
  },
  testimonialText: {
    color: '#FFFFFF',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  
  // Map Section
  mapSection: {
    padding: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  mapTitle: {
    fontSize: 28,
    fontFamily: 'JosefinSans-Bold',
    marginBottom: 20,
    color: '#1D1B44',
    textAlign: 'center',
  },
  mapContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  map: {
    width: '100%',
    height: 250,
  },
  mapButton: {
    backgroundColor: '#1D1B44',
    padding: 12,
    alignItems: 'center',
  },
  mapButtonText: {
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 16,
  },
  
  // Footer Section
  footerSection: {
    padding: 25,
    backgroundColor: '#2c2c2c',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
  },
  footerTitle: {
    fontSize: 28,
    fontFamily: 'JosefinSans-Bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  footerInfo: {
    backgroundColor: '#2c2c2c',
    marginTop: 30,
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  footerInfoText: {
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 16,
    marginBottom: 8,
  },
  copyright: {
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});