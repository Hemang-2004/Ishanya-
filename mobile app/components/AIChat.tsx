// "use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
// Import for React Native environment
import { GoogleGenerativeAI } from "@google/generative-ai"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

interface AIChatProps {
  studentName: string
  onClose: () => void
  apiKey: string // Correct type declaration
 // Gemini API key
}

const AIChat: React.FC<AIChatProps> = ({ studentName, onClose, apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello ${studentName}! I'm your AI assistant. How can I help you with your studies today?`,
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)
  
  // Generate response using Gemini API
  const generateGeminiResponse = async (userMessage: string) => {
    setIsLoading(true)
    
    try {
      // Initialize the API with your key
      const genAI = new GoogleGenerativeAI(apiKey)
      
      // Get the model
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })
      
      // Create conversation history for context
      const conversationHistory = messages
        .map(msg => `${msg.sender === 'user' ? studentName : 'Assistant'}: ${msg.text}`)
        .join('\n')
      
      // Create the prompt with context
      const prompt = `
        You are an AI study assistant helping ${studentName} with their academic queries.
        Be concise and helpful with responses under 150 words.
        Focus on education-related topics including assignments, courses, schedules, and academic progress.
        
        Conversation history:
        ${conversationHistory}
        
        ${studentName}: ${userMessage}
        Assistant:
      `
      
      // Generate content
      const result = await model.generateContent(prompt)
      const response = result.response.text()
      
      // Add AI response to messages
      const newMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: "ai",
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, newMessage])
    } catch (error) {
      console.error("Error with Gemini API:", error)
      
      // Fallback response
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        text: "I'm having trouble connecting to my knowledge base right now. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = () => {
    if (inputText.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputText("")

    // Generate AI response
    generateGeminiResponse(inputText)

    Keyboard.dismiss()
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [messages])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color="#333" />
        </Pressable>
      </View>

      <ScrollView ref={scrollViewRef} style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[styles.messageBubble, message.sender === "user" ? styles.userMessage : styles.aiMessage]}
          >
            <Text style={[styles.messageText, { color: message.sender === "user" ? "#fff" : "#333" }]}>
              {message.text}
            </Text>
            <Text style={[styles.timestamp, { color: message.sender === "user" ? "#eee" : "#888" }]}>
              {formatTime(message.timestamp)}
            </Text>
          </View>
        ))}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#408c4c" />
            <Text style={styles.loadingText}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <Pressable
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <MaterialIcons name="send" size={24} color={inputText.trim() ? "#408c4c" : "#ccc"} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  closeButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#408c4c",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  messageText: {
    fontSize: 16,
    fontFamily: "JosefinSans-Regular",
  },
  timestamp: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontFamily: "JosefinSans-Regular",
  },
  sendButton: {
    marginLeft: 12,
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
})

export default AIChat