import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { recordSpeech } from "@/functions/recordSpeech";
import useWebFocus from "@/hooks/useWebFocus";
import { useSession } from "@/functions/auth/ctx";
import { speechTo } from "@/functions/speechTo";
import { textTo } from "@/functions/textTo";
import { MealCard } from "@/components/resultAnalysis/meal";
import { SportCard } from "@/components/resultAnalysis/sport";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const isWebFocused = useWebFocus();
  const audioRecordingRef = useRef(new Audio.Recording());
  const webAudioPermissionsRef = useRef<MediaStream | null>(null);
  const [mealAnalysis, setMealAnalysis] = useState({});
  const [sportAnalysis, setSportAnalysis] = useState<
    {
      _id: String;
      sport: String;
      caloriesBurned: Number;
      transcription: String;
      duration: String;
    }[]
  >([]);
  const { signOut, session } = useSession();

  useEffect(() => {
    if (isWebFocused) {
      const getMicAccess = async () => {
        const permissions = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        webAudioPermissionsRef.current = permissions;
      };
      if (!webAudioPermissionsRef.current) getMicAccess();
    } else {
      if (webAudioPermissionsRef.current) {
        webAudioPermissionsRef.current
          .getTracks()
          .forEach((track) => track.stop());
        webAudioPermissionsRef.current = null;
      }
    }
  }, [isWebFocused]);

  const startRecording = async () => {
    setIsRecording(true);
    await recordSpeech(
      audioRecordingRef,
      setIsRecording,
      !!webAudioPermissionsRef.current
    );
  };

  const stopRecording = async (
    endpoint: "speech-to-meal" | "speech-to-sport"
  ) => {
    setIsRecording(false);
    setIsTranscribing(true);
    try {
      const result = await speechTo(audioRecordingRef, session, endpoint);
      console.log("Result:", result);
      if (endpoint === "speech-to-meal") {
        setMealAnalysis(result || {});
      } else {
        setSportAnalysis(result || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.mainScrollContainer}>
        <View style={styles.mainInnerContainer}>
          <Text
            onPress={() => {
              signOut();
            }}
          >
            Sign Out
          </Text>
          <Text style={styles.title}>Je vais calculer tes calories !</Text>

          {mealAnalysis && Object.keys(mealAnalysis).length > 0 && (
            <MealCard
              name={mealAnalysis.name}
              totalCalories={mealAnalysis.totalCalories}
              transcription={mealAnalysis.transcription}
              foods={mealAnalysis.foods}
            />
          )}
          {sportAnalysis &&
            sportAnalysis.length > 0 &&
            sportAnalysis.map((analysis) => (
              <SportCard
                key={analysis._id}
                sport={analysis.sport}
                caloriesBurned={analysis.caloriesBurned}
                transcription={analysis.transcription}
                duration={analysis.duration}
              />
            ))}
          <TouchableOpacity
            style={{
              ...styles.microphoneButton,
              opacity: isRecording || isTranscribing ? 0.5 : 1,
            }}
            onPressIn={startRecording}
            onPressOut={() => stopRecording("speech-to-meal")}
            disabled={isRecording || isTranscribing}
          >
            {isRecording ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <FontAwesome name="microphone" size={40} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.microphoneButton,
              opacity: isRecording || isTranscribing ? 0.5 : 1,
            }}
            onPressIn={startRecording}
            onPressOut={() => stopRecording("speech-to-sport")}
            disabled={isRecording || isTranscribing}
          >
            {isRecording ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <FontAwesome name="microphone" size={40} color="white" />
            )}
          </TouchableOpacity>
          <Link href="/(app)/TextInputSport" asChild>
            <Pressable style={styles.pressableButton}>
              <Text>Add sport</Text>
            </Pressable>
          </Link>
          <Link href="/(app)/TextInputMeal" asChild>
            <Pressable>
              <Text>Add meal</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainScrollContainer: {
    padding: 0,
    height: "100%",
    width: "100%",
  },
  mainInnerContainer: {
    gap: 200,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 35,
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  microphoneButton: {
    backgroundColor: "red",
    width: 75,
    height: 75,
    marginTop: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  pressableButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
});
