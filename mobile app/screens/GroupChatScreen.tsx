"use client"

import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
  ScrollView,
  Alert,
  Image,
  Pressable,
  Vibration,
  Clipboard,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from "@expo/vector-icons"
import * as DocumentPicker from "expo-document-picker"

// Sample data for different chats
const CHAT_DATA_MAP = {
  // Digital Literacy Group Chat
  g1: [
    {
      id: "g1_1",
      sender: "Priya Sharma",
      message: "Hello everyone! How is your project coming along?",
      time: "10:30 AM",
      isCurrentUser: false,
      seen: ["You", "Rahul Verma", "Anita Desai"],
      avatar: "PS",
      reactions: [],
    },
    {
      id: "g1_2",
      sender: "Rahul Verma",
      message: "I've completed the first part. Working on the second now.",
      time: "10:32 AM",
      isCurrentUser: false,
      seen: ["You", "Priya Sharma", "Anita Desai"],
      avatar: "RV",
      reactions: [],
    },
    {
      id: "g1_3",
      sender: "You",
      message: "I'm almost done with mine. Just need to add some final touches.",
      time: "10:35 AM",
      isCurrentUser: true,
      seen: ["Priya Sharma", "Rahul Verma", "Anita Desai"],
      avatar: "AS",
      reactions: [{ user: "Priya Sharma", emoji: "👍" }],
    },
    {
      id: "g1_4",
      sender: "Anita Desai",
      message: "Can someone help me with the third section? I'm stuck.",
      time: "10:40 AM",
      isCurrentUser: false,
      seen: ["You", "Priya Sharma"],
      avatar: "AD",
      reactions: [],
    },
    {
      id: "g1_5",
      sender: "You",
      message: "Sure, I can help you after class today.",
      time: "10:42 AM",
      isCurrentUser: true,
      seen: ["Priya Sharma", "Anita Desai"],
      avatar: "AS",
      reactions: [{ user: "Anita Desai", emoji: "❤️" }],
    },
    {
      id: "g1_6",
      sender: "Priya Sharma",
      message: "Here's the reference material for today's assignment:",
      time: "11:15 AM",
      isCurrentUser: false,
      seen: ["You", "Rahul Verma"],
      avatar: "PS",
      reactions: [],
      isImage: true,
      imageUrl: "/placeholder.svg?height=200&width=300",
      caption: "Digital Literacy Reference Guide",
    },
    {
      id: "g1_7",
      sender: "Rahul Verma",
      message: "Thanks for sharing! This will be helpful.",
      time: "11:20 AM",
      isCurrentUser: false,
      seen: ["You", "Priya Sharma"],
      avatar: "RV",
      reactions: [],
    },
    {
      id: "g1_8",
      sender: "You",
      message: "I've added this to my notes. Will review it tonight.",
      time: "11:25 AM",
      isCurrentUser: true,
      seen: ["Priya Sharma", "Rahul Verma"],
      avatar: "AS",
      reactions: [],
    },
  ],

  // MS PPT Group
  g2: [
    {
      id: "g2_1",
      sender: "Ajay Kumar",
      message: "Good morning everyone! Today we'll be learning about animations in PowerPoint.",
      time: "9:00 AM",
      isCurrentUser: false,
      seen: ["You", "Neha Patel", "Vikram Singh"],
      avatar: "AK",
      reactions: [],
    },
    {
      id: "g2_2",
      sender: "Neha Patel",
      message: "I'm excited to learn about transitions!",
      time: "9:05 AM",
      isCurrentUser: false,
      seen: ["You", "Ajay Kumar", "Vikram Singh"],
      avatar: "NP",
      reactions: [],
    },
    {
      id: "g2_3",
      sender: "You",
      message: "Will we be covering custom animations as well?",
      time: "9:07 AM",
      isCurrentUser: true,
      seen: ["Ajay Kumar", "Neha Patel"],
      avatar: "AS",
      reactions: [],
    },
    {
      id: "g2_4",
      sender: "Ajay Kumar",
      message: "Yes, we'll cover custom animations in the second half of the class.",
      time: "9:10 AM",
      isCurrentUser: false,
      seen: ["You", "Neha Patel"],
      avatar: "AK",
      reactions: [{ user: "You", emoji: "👍" }],
    },
    {
      id: "g2_5",
      sender: "Vikram Singh",
      message: "Here's an example of what we'll be creating today:",
      time: "9:15 AM",
      isCurrentUser: false,
      seen: ["You", "Ajay Kumar", "Neha Patel"],
      avatar: "VS",
      reactions: [],
      isImage: true,
      imageUrl: "/placeholder.svg?height=200&width=300",
      caption: "PowerPoint Animation Example",
    },
    {
      id: "g2_6",
      sender: "You",
      message: "That looks great! Can't wait to learn how to do that.",
      time: "9:18 AM",
      isCurrentUser: true,
      seen: ["Ajay Kumar", "Vikram Singh"],
      avatar: "AS",
      reactions: [{ user: "Ajay Kumar", emoji: "🔥" }],
    },
  ],

  // Priya Sharma (Personal Chat)
  p1: [
    {
      id: "p1_1",
      sender: "Priya Sharma",
      message: "Hi Arjun, how are you doing with the assignment?",
      time: "2:00 PM",
      isCurrentUser: false,
      seen: ["You"],
      avatar: "PS",
      reactions: [],
    },
    {
      id: "p1_2",
      sender: "You",
      message: "Hello ma'am, I'm making good progress. Just have a few questions.",
      time: "2:05 PM",
      isCurrentUser: true,
      seen: ["Priya Sharma"],
      avatar: "AS",
      reactions: [],
    },
    {
      id: "p1_3",
      sender: "Priya Sharma",
      message: "Sure, what questions do you have?",
      time: "2:07 PM",
      isCurrentUser: false,
      seen: ["You"],
      avatar: "PS",
      reactions: [],
    },
    {
      id: "p1_4",
      sender: "You",
      message: "For the third part, should we include examples from outside the textbook?",
      time: "2:10 PM",
      isCurrentUser: true,
      seen: ["Priya Sharma"],
      avatar: "AS",
      reactions: [],
    },
    {
      id: "p1_5",
      sender: "Priya Sharma",
      message: "Yes, that would be great! External examples show your research skills.",
      time: "2:15 PM",
      isCurrentUser: false,
      seen: ["You"],
      avatar: "PS",
      reactions: [{ user: "You", emoji: "👍" }],
    },
    {
      id: "p1_6",
      sender: "You",
      message: "Thank you! I'll include some examples from recent tech developments.",
      time: "2:18 PM",
      isCurrentUser: true,
      seen: ["Priya Sharma"],
      avatar: "AS",
      reactions: [],
    },
    {
      id: "p1_7",
      sender: "Priya Sharma",
      message: "Here's a reference document that might help you:",
      time: "2:25 PM",
      isCurrentUser: false,
      seen: ["You"],
      avatar: "PS",
      reactions: [],
      isImage: true,
      imageUrl: "/placeholder.svg?height=200&width=300",
      caption: "Digital Literacy Research Guide",
    },
  ],

  // Ajay Kumar (Personal Chat)
  p2: [
    {
      id: "p2_1",
      sender: "Ajay Kumar",
      message: "Arjun, have you completed the PowerPoint presentation?",
      time: "3:30 PM",
      isCurrentUser: false,
      seen: ["You"],
      avatar: "AK",
      reactions: [],
    },
    {
      id: "p2_2",
      sender: "You",
      message: "Yes sir, I've completed it. Just adding the final animations.",
      time: "3:35 PM",
      isCurrentUser: true,
      seen: ["Ajay Kumar"],
      avatar: "AS",
      reactions: [],
    },
    {
      id: "p2_3",
      sender: "Ajay Kumar",
      message: "Great! Remember to use the techniques we discussed in class.",
      time: "3:40 PM",
      isCurrentUser: false,
      seen: ["You"],
      avatar: "AK",
      reactions: [],
    },
    {
      id: "p2_4",
      sender: "You",
      message: "I've implemented the slide transitions and custom animations as you suggested.",
      time: "3:45 PM",
      isCurrentUser: true,
      seen: ["Ajay Kumar"],
      avatar: "AS",
      reactions: [{ user: "Ajay Kumar", emoji: "👍" }],
    },
    {
      id: "p2_5",
      sender: "Ajay Kumar",
      message: "Excellent! Looking forward to seeing your presentation tomorrow.",
      time: "3:50 PM",
      isCurrentUser: false,
      seen: ["You"],
      avatar: "AK",
      reactions: [],
    },
    {
      id: "p2_6",
      sender: "You",
      message: "Here's a preview of my presentation:",
      time: "4:00 PM",
      isCurrentUser: true,
      seen: ["Ajay Kumar"],
      avatar: "AS",
      reactions: [{ user: "Ajay Kumar", emoji: "🔥" }],
      isImage: true,
      imageUrl: "/placeholder.svg?height=200&width=300",
      caption: "MS PowerPoint Presentation Preview",
    },
    {
      id: "p2_7",
      sender: "Ajay Kumar",
      message: "This looks very professional! Great work on the design.",
      time: "4:05 PM",
      isCurrentUser: false,
      seen: ["You"],
      avatar: "AK",
      reactions: [],
    },
    {
      id: "p2_8",
      sender: "You",
      message: "Thank you sir! I spent extra time on the design elements.",
      time: "4:10 PM",
      isCurrentUser: true,
      seen: ["Ajay Kumar"],
      avatar: "AS",
      reactions: [],
    },
  ],
}

// Chat options
const CHAT_OPTIONS = {
  groups: [
    { id: "g1", name: "Digital Literacy ", unread: 2, avatar: "DL" },
    { id: "g2", name: "MS PPT Group", unread: 0, avatar: "MP" },
  ],
  personal: [
    { id: "p1", name: "Priya Sharma", role: "Digital Literacy Teacher", unread: 1, avatar: "PS" },
    { id: "p2", name: "Ajay Kumar", role: "MS PPT Teacher", unread: 3, avatar: "AK" },
  ],
}

export default function GroupChatScreen() {
  const [message, setMessage] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)
  const [currentChat, setCurrentChat] = useState({
    id: "g1",
    name: "Digital Literacy ",
    isGroup: true,
    avatar: "DL",
  })
  const [chatData, setChatData] = useState(CHAT_DATA_MAP[currentChat.id])
  const [showOptionsModal, setShowOptionsModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showMessageOptions, setShowMessageOptions] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [showReactions, setShowReactions] = useState(false)
  const [showForwardModal, setShowForwardModal] = useState(false)
  const [contactSaved, setContactSaved] = useState(false)

  const flatListRef = useRef(null)
  const longPressTimeout = useRef(null)
  const doubleTapTimeout = useRef(null)
  const lastTap = useRef(0)

  useEffect(() => {
    setChatData(CHAT_DATA_MAP[currentChat.id])
  }, [currentChat.id])

  const renderChatItem = ({ item }) => {
    const handleMessagePress = () => {
      const now = Date.now()
      const DOUBLE_TAP_DELAY = 600
    
      if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
        // Double tap detected
        clearTimeout(doubleTapTimeout.current) // Clear single tap timeout
        lastTap.current = 0
        handleDoubleTap(item)
      } else {
        // First tap
        lastTap.current = now
        doubleTapTimeout.current = setTimeout(() => {
          // Single tap - show message options after timeout if no double tap
          setSelectedMessage(item)
          setShowMessageOptions(true)
          lastTap.current = 0
        }, DOUBLE_TAP_DELAY)
      }
    }

    const handleLongPress = () => {
      Vibration.vibrate(50)
      setSelectedMessage(item)
      setShowMessageOptions(true)
    }

    const handlePressIn = () => {
      // Delay to detect long press (500ms)
      longPressTimeout.current = setTimeout(() => {
        // Prevent long press if double tap was detected
        if (lastTap.current !== 0) {
          return
        }
        handleLongPress()
      }, 500)
    }

    const handlePressOut = () => {
      if (longPressTimeout.current) {
        clearTimeout(longPressTimeout.current)
      }
    }
    const handleDoubleTap = (message) => {
      setSelectedMessage(message)
      setShowReactions(true) // Only show reactions modal on double tap
    }

    return (
      <Pressable
        onPress={handleMessagePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayLongPress={2000}
      >
        <View style={[styles.chatBubble, item.isCurrentUser ? styles.userBubble : styles.otherBubble]}>
          {!item.isCurrentUser && (
            <View style={styles.senderContainer}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{item.avatar}</Text>
              </View>
              <Text style={styles.senderName}>{item.sender}</Text>
            </View>
          )}

          {item.isImage ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.messageImage} resizeMode="cover" />
              {item.caption && <Text style={styles.imageCaption}>{item.caption}</Text>}
            </View>
          ) : (
            <Text style={[styles.messageText, item.isCurrentUser ? styles.userMessageText : styles.otherMessageText]}>
              {item.message}
            </Text>
          )}

          <View style={styles.messageFooter}>
            <Text style={[styles.timeText, item.isCurrentUser ? styles.userTimeText : styles.otherTimeText]}>
              {item.time}
            </Text>
            {item.isCurrentUser && (
              <MaterialIcons name="done-all" size={16} color={item.seen.length > 0 ? "#34B7F1" : "#888"} />
            )}
          </View>

          {item.reactions.length > 0 && (
            <View style={styles.reactionsContainer}>
              {item.reactions.map((reaction, index) => (
                <Text key={index} style={styles.reactionEmoji}>
                  {reaction.emoji}
                </Text>
              ))}
            </View>
          )}
        </View>
      </Pressable>
    )
  }

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: `${currentChat.id}_${Date.now()}`,
        sender: "You",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isCurrentUser: true,
        seen: [],
        avatar: "AS",
        reactions: [],
      }

      const updatedChatData = [...chatData, newMessage]
      setChatData(updatedChatData)

      // Update the global chat data map
      CHAT_DATA_MAP[currentChat.id] = updatedChatData

      setMessage("")

      // Scroll to the bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }

  const handleAttachFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      })

      if (result.type === "success") {
        Alert.alert("File Selected", `File "${result.name}" ready to attach`)

        // For demo purposes, we'll add a placeholder image message
        const newMessage = {
          id: `${currentChat.id}_${Date.now()}`,
          sender: "You",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isCurrentUser: true,
          seen: [],
          avatar: "AS",
          reactions: [],
          isImage: true,
          imageUrl: "/placeholder.svg?height=200&width=300",
          caption: result.name,
        }

        const updatedChatData = [...chatData, newMessage]
        setChatData(updatedChatData)
        CHAT_DATA_MAP[currentChat.id] = updatedChatData

        // Scroll to the bottom
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true })
        }, 100)
      }
    } catch (error) {
      console.error("Error picking document:", error)
    }
  }

  const handleChatSelect = (chatId, isGroup) => {
    const selectedChat = isGroup
      ? CHAT_OPTIONS.groups.find((g) => g.id === chatId)
      : CHAT_OPTIONS.personal.find((p) => p.id === chatId)

    if (selectedChat) {
      setCurrentChat({
        id: chatId,
        name: selectedChat.name,
        isGroup,
        avatar: selectedChat.avatar,
      })
    }
    setShowSidebar(false)
  }

  const handleCall = () => {
    Alert.alert("Initiate Call", `Calling ${currentChat.name}...`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Call",
        onPress: () => {
          // Simulate a phone call
          Alert.alert("Calling", `Connected to ${currentChat.name}`)
        },
      },
    ])
  }

  const handleVideoCall = () => {
    Alert.alert("Initiate Video Call", `Video calling ${currentChat.name}...`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Video Call",
        onPress: () => {
          // Simulate a video call
          Alert.alert("Video Calling", `Connected to ${currentChat.name}`)
        },
      },
    ])
  }

  const handleSaveContact = () => {
    setContactSaved(true)
    setShowContactModal(false)
    setShowOptionsModal(false)

    Alert.alert("Contact Saved", `${currentChat.name} has been saved to your contacts.`)
  }

  const handleDeleteMessage = (forEveryone) => {
    if (!selectedMessage) return

    const updatedChatData = chatData.filter((msg) => {
      if (msg.id === selectedMessage.id) {
        if (forEveryone || msg.isCurrentUser) {
          return false
        }
      }
      return true
    })

    setChatData(updatedChatData)
    CHAT_DATA_MAP[currentChat.id] = updatedChatData
    setShowMessageOptions(false)

    Alert.alert("Message Deleted", forEveryone ? "Message deleted for everyone" : "Message deleted for you")
  }

  const handleCopyToClipboard = () => {
    if (!selectedMessage) return

    const textToCopy = selectedMessage.isImage ? selectedMessage.caption || "Image" : selectedMessage.message

    Clipboard.setString(textToCopy)
    setShowMessageOptions(false)

    Alert.alert("Copied", "Message copied to clipboard")
  }

  const handleAddReaction = (emoji) => {
    if (!selectedMessage) return

    const updatedChatData = chatData.map((msg) => {
      if (msg.id === selectedMessage.id) {
        // Check if user already reacted
        const existingReactionIndex = msg.reactions.findIndex((r) => r.user === "You")

        if (existingReactionIndex >= 0) {
          // Update existing reaction
          const updatedReactions = [...msg.reactions]
          updatedReactions[existingReactionIndex] = { user: "You", emoji }
          return { ...msg, reactions: updatedReactions }
        } else {
          // Add new reaction
          return {
            ...msg,
            reactions: [...msg.reactions, { user: "You", emoji }],
          }
        }
      }
      return msg
    })

    setChatData(updatedChatData)
    CHAT_DATA_MAP[currentChat.id] = updatedChatData
    setShowReactions(false)
  }

  const handleForwardMessage = (chatId) => {
    if (!selectedMessage) return

    // Add the forwarded message to the selected chat
    const forwardedMessage = {
      ...selectedMessage,
      id: `${chatId}_${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isCurrentUser: true,
      seen: [],
      reactions: [],
    }

    CHAT_DATA_MAP[chatId] = [...CHAT_DATA_MAP[chatId], forwardedMessage]

    setShowForwardModal(false)

    Alert.alert(
      "Message Forwarded",
      `Message forwarded to ${
        CHAT_OPTIONS.groups.find((g) => g.id === chatId)?.name ||
        CHAT_OPTIONS.personal.find((p) => p.id === chatId)?.name
      }`,
    )
  }

  return (
    <ImageBackground source={require("../assets/images/1.jpg")} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setShowSidebar(true)}>
            <MaterialIcons name="menu" size={24} color="#408c4c" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerProfile} onPress={() => {}}>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>{currentChat.avatar}</Text>
            </View>
            <Text style={styles.headerTitle}>{currentChat.name}</Text>
          </TouchableOpacity>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={handleCall}>
              <MaterialIcons name="call" size={24} color="#408c4c" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleVideoCall}>
              <MaterialIcons name="videocam" size={24} color="#408c4c" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => setShowOptionsModal(true)}>
              <MaterialIcons name="more-vert" size={24} color="#408c4c" />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={chatData}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          onLayout={() => {
            flatListRef.current?.scrollToEnd({ animated: false })
          }}
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton} onPress={handleAttachFile}>
            <MaterialIcons name="attach-file" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#666"
            value={message}
            onChangeText={setMessage}
            fontFamily="JosefinSans-Regular"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <MaterialIcons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Chat Sidebar */}
        <Modal
          visible={showSidebar}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowSidebar(false)}
        >
          <View style={styles.sidebarOverlay}>
            <View style={styles.sidebar}>
              <View style={styles.sidebarHeader}>
                <Text style={styles.sidebarTitle}>Chats</Text>
                <TouchableOpacity onPress={() => setShowSidebar(false)}>
                  <MaterialIcons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.sidebarContent}>
                <Text style={styles.sidebarSectionTitle}>Group Chats</Text>
                {CHAT_OPTIONS.groups.map((group) => (
                  <TouchableOpacity
                    key={group.id}
                    style={[styles.chatOption, currentChat.id === group.id && styles.activeChatOption]}
                    onPress={() => handleChatSelect(group.id, true)}
                  >
                    <View style={styles.chatOptionIcon}>
                      <Text style={styles.avatarText}>{group.avatar}</Text>
                    </View>
                    <View style={styles.chatOptionContent}>
                      <Text style={styles.chatOptionTitle}>{group.name}</Text>
                    </View>
                    {group.unread > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{group.unread}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}

                <Text style={styles.sidebarSectionTitle}>Personal Chats</Text>
                {CHAT_OPTIONS.personal.map((person) => (
                  <TouchableOpacity
                    key={person.id}
                    style={[styles.chatOption, currentChat.id === person.id && styles.activeChatOption]}
                    onPress={() => handleChatSelect(person.id, false)}
                  >
                    <View style={styles.chatOptionIcon}>
                      <Text style={styles.avatarText}>{person.avatar}</Text>
                    </View>
                    <View style={styles.chatOptionContent}>
                      <Text style={styles.chatOptionTitle}>{person.name}</Text>
                      <Text style={styles.chatOptionSubtitle}>{person.role}</Text>
                    </View>
                    {person.unread > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{person.unread}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Options Modal */}
        <Modal
          visible={showOptionsModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowOptionsModal(false)}
        >
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowOptionsModal(false)}>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                  setShowOptionsModal(false)
                  setShowContactModal(true)
                }}
              >
                <MaterialIcons name="person-add" size={24} color="#408c4c" />
                <Text style={styles.optionText}>Save Contact</Text>
              </TouchableOpacity>
              {contactSaved && (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    setShowOptionsModal(false)
                    Alert.alert("View Contact", `Viewing ${currentChat.name}'s contact information`)
                  }}
                >
                  <MaterialIcons name="person" size={24} color="#408c4c" />
                  <Text style={styles.optionText}>View Contact</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                  setShowOptionsModal(false)
                  Alert.alert("Search", "Searching in conversation")
                }}
              >
                <MaterialIcons name="search" size={24} color="#408c4c" />
                <Text style={styles.optionText}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                  setShowOptionsModal(false)
                  Alert.alert("Mute Notifications", `${currentChat.name} has been muted`)
                }}
              >
                <MaterialIcons name="notifications-off" size={24} color="#408c4c" />
                <Text style={styles.optionText}>Mute Notifications</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Save Contact Modal */}
        <Modal
          visible={showContactModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowContactModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.contactModalContainer}>
              <View style={styles.contactModalHeader}>
                <Text style={styles.contactModalTitle}>Save Contact</Text>
                <TouchableOpacity onPress={() => setShowContactModal(false)}>
                  <MaterialIcons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.contactModalContent}>
                <View style={styles.contactAvatarLarge}>
                  <Text style={styles.contactAvatarLargeText}>{currentChat.avatar}</Text>
                </View>

                <Text style={styles.contactName}>{currentChat.name}</Text>

                <View style={styles.contactInfoItem}>
                  <MaterialIcons name="phone" size={20} color="#408c4c" />
                  <Text style={styles.contactInfoText}>+91 98765 43210</Text>
                </View>

                <TouchableOpacity style={styles.saveContactButton} onPress={handleSaveContact}>
                  <Text style={styles.saveContactButtonText}>Save Contact</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Message Options Modal */}
        <Modal
          visible={showMessageOptions}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowMessageOptions(false)}
        >
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowMessageOptions(false)}>
            <View style={styles.messageOptionsContainer}>
              <TouchableOpacity
                style={styles.messageOptionItem}
                onPress={() => {
                  setShowMessageOptions(false)
                  Alert.alert("Message Info", `Seen by: ${selectedMessage?.seen.join(", ") || "No one yet"}`)
                }}
              >
                <MaterialIcons name="info" size={24} color="#408c4c" />
                <Text style={styles.messageOptionText}>Info</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.messageOptionItem} onPress={handleCopyToClipboard}>
                <MaterialIcons name="content-copy" size={24} color="#408c4c" />
                <Text style={styles.messageOptionText}>Copy to Clipboard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.messageOptionItem}
                onPress={() => {
                  setShowMessageOptions(false)
                  Alert.alert("Delete Message", "Choose delete option", [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete for me",
                      onPress: () => handleDeleteMessage(false),
                    },
                    {
                      text: "Delete for everyone",
                      onPress: () => handleDeleteMessage(true),
                    },
                  ])
                }}
              >
                <MaterialIcons name="delete" size={24} color="#ff6b6b" />
                <Text style={styles.messageOptionText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.messageOptionItem}
                onPress={() => {
                  setShowMessageOptions(false)
                  Alert.alert("Share", "Sharing message via other apps")
                }}
              >
                <MaterialIcons name="share" size={24} color="#408c4c" />
                <Text style={styles.messageOptionText}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.messageOptionItem}
                onPress={() => {
                  setShowMessageOptions(false)
                  setShowForwardModal(true)
                }}
              >
                <MaterialIcons name="forward" size={24} color="#408c4c" />
                <Text style={styles.messageOptionText}>Forward</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Reactions Modal */}
        <Modal
          visible={showReactions}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowReactions(false)}
        >
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowReactions(false)}>
            <View style={styles.reactionsModalContainer}>
              <TouchableOpacity style={styles.reactionButton} onPress={() => handleAddReaction("❤️")}>
                <Text style={styles.reactionButtonText}>❤️</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reactionButton} onPress={() => handleAddReaction("😊")}>
                <Text style={styles.reactionButtonText}>😊</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reactionButton} onPress={() => handleAddReaction("😢")}>
                <Text style={styles.reactionButtonText}>😢</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reactionButton} onPress={() => handleAddReaction("😂")}>
                <Text style={styles.reactionButtonText}>😂</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reactionButton} onPress={() => handleAddReaction("🔥")}>
                <Text style={styles.reactionButtonText}>🔥</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Forward Modal */}
        <Modal
          visible={showForwardModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowForwardModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.forwardModalContainer}>
              <View style={styles.forwardModalHeader}>
                <Text style={styles.forwardModalTitle}>Forward to...</Text>
                <TouchableOpacity onPress={() => setShowForwardModal(false)}>
                  <MaterialIcons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.forwardModalContent}>
                <Text style={styles.forwardSectionTitle}>Group Chats</Text>
                {CHAT_OPTIONS.groups.map((group) => (
                  <TouchableOpacity
                    key={group.id}
                    style={styles.forwardOption}
                    onPress={() => handleForwardMessage(group.id)}
                  >
                    <View style={styles.forwardOptionIcon}>
                      <Text style={styles.avatarText}>{group.avatar}</Text>
                    </View>
                    <Text style={styles.forwardOptionText}>{group.name}</Text>
                  </TouchableOpacity>
                ))}

                <Text style={styles.forwardSectionTitle}>Personal Chats</Text>
                {CHAT_OPTIONS.personal.map((person) => (
                  <TouchableOpacity
                    key={person.id}
                    style={styles.forwardOption}
                    onPress={() => handleForwardMessage(person.id)}
                  >
                    <View style={styles.forwardOptionIcon}>
                      <Text style={styles.avatarText}>{person.avatar}</Text>
                    </View>
                    <Text style={styles.forwardOptionText}>{person.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(255, 216, 112, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C",
  },
  menuButton: {
    padding: 5,
  },
  headerProfile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#408c4c",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerAvatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "JosefinSans-Bold",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
  chatList: {
    padding: 15,
    paddingBottom: 80,
  },
  chatBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#E3F2E4",
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
    borderWidth: 0,
  },
  senderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  avatarContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#408c4c",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  avatarText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "500",
    fontFamily: "JosefinSans-Medium",
  },
  senderName: {
    fontSize: 11,
    fontWeight: "500",
    color: "#666",
    fontFamily: "JosefinSans-Medium",
    opacity: 0.8,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "JosefinSans-Regular",
  },
  userMessageText: {
    color: "#1a1a1a",
  },
  otherMessageText: {
    color: "#1a1a1a",
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 2,
    opacity: 0.7,
  },
  timeText: {
    fontSize: 10,
    marginRight: 3,
    fontFamily: "JosefinSans-Regular",
  },
  userTimeText: {
    color: "#666",
  },
  otherTimeText: {
    color: "#666",
  },
  imageContainer: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 4,
    backgroundColor: "#f5f5f5",
  },
  messageImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  imageCaption: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    paddingHorizontal: 4,
    fontFamily: "JosefinSans-Regular",
  },
  reactionsContainer: {
    position: "absolute",
    bottom: -12,
    right: 8,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  reactionEmoji: {
    fontSize: 14,
    marginHorizontal: 1,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF8DC",
    borderTopWidth: 1,
    borderTopColor: "#D2B48C",
  },
  attachButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFAF0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#D2B48C",
    fontFamily: "JosefinSans-Regular",
  },
  sendButton: {
    backgroundColor: "#408c4c",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sidebarOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sidebar: {
    width: "75%",
    height: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(255, 216, 112, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C",
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  sidebarContent: {
    flex: 1,
  },
  sidebarSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    padding: 15,
    backgroundColor: "#f5f5f5",
    fontFamily: "JosefinSans-Bold",
  },
  chatOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  activeChatOption: {
    backgroundColor: "#f0f8ff",
    borderLeftWidth: 4,
    borderLeftColor: "#408c4c",
  },
  chatOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#408c4c",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  chatOptionContent: {
    flex: 1,
  },
  chatOptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  chatOptionSubtitle: {
    fontSize: 12,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#408c4c",
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "JosefinSans-Regular",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 200,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  contactModalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contactModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  contactModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  contactModalContent: {
    padding: 20,
    alignItems: "center",
  },
  contactAvatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#408c4c",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  contactAvatarLargeText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "JosefinSans-Bold",
  },
  contactName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    fontFamily: "JosefinSans-Bold",
  },
  contactInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactInfoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  saveContactButton: {
    backgroundColor: "#408c4c",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  saveContactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "JosefinSans-Bold",
  },
  messageOptionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 220,
  },
  messageOptionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  messageOptionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  reactionsModalContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reactionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  reactionButtonText: {
    fontSize: 24,
  },
  forwardModalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forwardModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  forwardModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  forwardModalContent: {
    maxHeight: 400,
  },
  forwardSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    padding: 15,
    backgroundColor: "#f5f5f5",
    fontFamily: "JosefinSans-Bold",
  },
  forwardOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  forwardOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#408c4c",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  forwardOptionText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
})

