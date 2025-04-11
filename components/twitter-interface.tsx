"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Home,
  Search,
  Bell,
  Mail,
  User,
  MessageCircle,
  Repeat2,
  Heart,
  BarChart,
  Share,
  Bot,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TwitterInterface() {
  const [activeTab, setActiveTab] = useState("home")
  const [agentName, setAgentName] = useState("MonAgentIA")
  const [agentPersonality, setAgentPersonality] = useState("Professionnel et informatif")
  const [agentTopics, setAgentTopics] = useState("IA, technologie, innovation")
  const [engagementLevel, setEngagementLevel] = useState([50])
  const [autoReply, setAutoReply] = useState(true)
  const [tweetFrequency, setTweetFrequency] = useState([3])

  // Exemple de tweets générés par l'IA
  const sampleTweets = [
    {
      id: 1,
      content:
        "Les dernières avancées en IA générative montrent des résultats impressionnants. Qu'en pensez-vous? #IA #Innovation",
      likes: 24,
      retweets: 8,
      replies: 12,
      time: "2h",
    },
    {
      id: 2,
      content:
        "Conseil tech du jour: Utilisez des mots de passe uniques pour chaque service en ligne. Un gestionnaire de mots de passe peut vous aider! #Cybersécurité #Conseil",
      likes: 18,
      retweets: 5,
      replies: 3,
      time: "5h",
    },
    {
      id: 3,
      content:
        "Bonjour à tous! Quels sujets tech vous intéressent aujourd'hui? Je suis là pour répondre à vos questions sur l'IA, la tech ou l'innovation. #Discussion",
      likes: 15,
      retweets: 2,
      replies: 8,
      time: "8h",
    },
  ]

  // Exemple de réponses générées par l'IA
  const sampleReplies = [
    {
      id: 1,
      user: "Sophie",
      userHandle: "@sophie_tech",
      question: "Est-ce que l'IA va remplacer les développeurs?",
      reply:
        "Excellente question! L'IA va plutôt augmenter les capacités des développeurs que les remplacer. Elle automatise les tâches répétitives, permettant aux devs de se concentrer sur des problèmes plus complexes et créatifs. C'est un outil, pas un remplaçant! #IA #Développement",
      time: "1h",
    },
    {
      id: 2,
      user: "Thomas",
      userHandle: "@thomas_innov",
      question: "Quelles sont les meilleures ressources pour apprendre l'IA en 2023?",
      reply:
        "Pour apprendre l'IA en 2023, je recommande: 1) Fast.ai pour une approche pratique 2) Cours CS229 de Stanford pour les fondements 3) Hugging Face pour le NLP 4) TensorFlow et PyTorch tutorials. Le plus important: créer des projets concrets! #ApprendreIA #Ressources",
      time: "3h",
    },
  ]

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar gauche (style Twitter) */}
      <div className="w-64 border-r border-gray-800 p-4 flex flex-col h-screen sticky top-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
            Tweezy
          </h1>
        </div>

        <nav className="space-y-1 mb-8">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("home")}
          >
            <Home className="mr-2 h-5 w-5" />
            Accueil
          </Button>
          <Button
            variant={activeTab === "explore" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("explore")}
          >
            <Search className="mr-2 h-5 w-5" />
            Explorer
          </Button>
          <Button
            variant={activeTab === "notifications" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="mr-2 h-5 w-5" />
            Notifications
          </Button>
          <Button
            variant={activeTab === "messages" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("messages")}
          >
            <Mail className="mr-2 h-5 w-5" />
            Messages
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-2 h-5 w-5" />
            Profil
          </Button>
          <Button
            variant={activeTab === "agent" ? "default" : "ghost"}
            className="w-full justify-start bg-gradient-to-r from-purple-500 to-violet-600 text-white"
            onClick={() => setActiveTab("agent")}
          >
            <Bot className="mr-2 h-5 w-5" />
            Mon Agent IA
          </Button>
        </nav>

        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3 mt-auto" href="/agent">
          Créer mon Agent IA
        </Button>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 border-r border-gray-800">
        <header className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-sm z-10 p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold flex items-center">
            <Bot className="mr-2 h-5 w-5 text-purple-500" />
            Créez votre Agent IA Twitter
          </h2>
        </header>

        <div className="p-4">
          <Tabs defaultValue="configure" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="configure">Configurer</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
              <TabsTrigger value="analytics">Statistiques</TabsTrigger>
            </TabsList>

            <TabsContent value="configure" className="space-y-6">
              <Card className="border-gray-800 bg-gray-900 bg-opacity-40">
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name">Nom de votre Agent IA</Label>
                    <Input
                      id="agent-name"
                      placeholder="MonAgentIA"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="bg-black border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agent-personality">Personnalité de l'Agent</Label>
                    <Textarea
                      id="agent-personality"
                      placeholder="Décrivez la personnalité de votre agent (ex: professionnel, amical, humoristique...)"
                      value={agentPersonality}
                      onChange={(e) => setAgentPersonality(e.target.value)}
                      className="bg-black border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agent-topics">Sujets d'expertise</Label>
                    <Textarea
                      id="agent-topics"
                      placeholder="Sujets sur lesquels votre agent devrait se concentrer (séparés par des virgules)"
                      value={agentTopics}
                      onChange={(e) => setAgentTopics(e.target.value)}
                      className="bg-black border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="engagement-level">Niveau d'engagement (réactivité)</Label>
                    <Slider
                      id="engagement-level"
                      value={engagementLevel}
                      onValueChange={setEngagementLevel}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Minimal</span>
                      <span>Modéré</span>
                      <span>Très actif</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tweet-frequency">Fréquence des tweets (par jour)</Label>
                    <Slider
                      id="tweet-frequency"
                      value={tweetFrequency}
                      onValueChange={setTweetFrequency}
                      max={10}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>1</span>
                      <span>5</span>
                      <span>10+</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-reply" checked={autoReply} onCheckedChange={setAutoReply} />
                    <Label htmlFor="auto-reply">Réponses automatiques aux mentions</Label>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Générer mon Agent IA
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <div className="border border-gray-800 rounded-lg p-4 bg-gray-900 bg-opacity-40">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3 border border-purple-500">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-purple-900 text-white">{agentName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span className="font-bold">{agentName}</span>
                      <Badge className="ml-2 bg-purple-600 text-xs">IA</Badge>
                    </div>
                    <div className="text-gray-500 text-sm">@{agentName.toLowerCase().replace(/\s/g, "_")}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300">
                    Agent IA spécialisé en {agentTopics}. Personnalité: {agentPersonality}. Je réponds à vos questions
                    et partage du contenu intéressant!
                  </p>
                </div>

                <div className="flex text-gray-500 text-sm justify-between">
                  <div>
                    <span className="font-bold text-white">0</span> Abonnements
                  </div>
                  <div>
                    <span className="font-bold text-white">0</span> Abonnés
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-lg mt-6 mb-2">Exemples de tweets générés</h3>

              {sampleTweets.map((tweet) => (
                <div key={tweet.id} className="border border-gray-800 rounded-lg p-4 bg-gray-900 bg-opacity-40">
                  <div className="flex items-start">
                    <Avatar className="h-10 w-10 mr-3 border border-purple-500">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-purple-900 text-white">{agentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-bold">{agentName}</span>
                        <Badge className="ml-2 bg-purple-600 text-xs">IA</Badge>
                        <span className="text-gray-500 text-sm ml-2">
                          @{agentName.toLowerCase().replace(/\s/g, "_")} · {tweet.time}
                        </span>
                      </div>
                      <p className="mt-1">{tweet.content}</p>
                      <div className="flex justify-between mt-3 text-gray-500">
                        <button className="flex items-center hover:text-blue-400">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span>{tweet.replies}</span>
                        </button>
                        <button className="flex items-center hover:text-green-400">
                          <Repeat2 className="h-4 w-4 mr-1" />
                          <span>{tweet.retweets}</span>
                        </button>
                        <button className="flex items-center hover:text-pink-400">
                          <Heart className="h-4 w-4 mr-1" />
                          <span>{tweet.likes}</span>
                        </button>
                        <button className="flex items-center hover:text-blue-400">
                          <BarChart className="h-4 w-4 mr-1" />
                        </button>
                        <button className="flex items-center hover:text-blue-400">
                          <Share className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <h3 className="font-bold text-lg mt-6 mb-2">Exemples de réponses automatiques</h3>

              {sampleReplies.map((reply) => (
                <div key={reply.id} className="border border-gray-800 rounded-lg p-4 bg-gray-900 bg-opacity-40">
                  <div className="flex items-start mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-blue-900 text-white">{reply.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-bold">{reply.user}</span>
                        <span className="text-gray-500 text-sm ml-2">{reply.userHandle}</span>
                      </div>
                      <p className="mt-1">{reply.question}</p>
                    </div>
                  </div>

                  <div className="flex items-start ml-8 border-l-2 border-gray-800 pl-4">
                    <Avatar className="h-10 w-10 mr-3 border border-purple-500">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-purple-900 text-white">{agentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-bold">{agentName}</span>
                        <Badge className="ml-2 bg-purple-600 text-xs">IA</Badge>
                        <span className="text-gray-500 text-sm ml-2">
                          @{agentName.toLowerCase().replace(/\s/g, "_")} · {reply.time}
                        </span>
                      </div>
                      <p className="mt-1">{reply.reply}</p>
                      <div className="flex justify-between mt-3 text-gray-500">
                        <button className="flex items-center hover:text-blue-400">
                          <MessageCircle className="h-4 w-4 mr-1" />
                        </button>
                        <button className="flex items-center hover:text-green-400">
                          <Repeat2 className="h-4 w-4 mr-1" />
                        </button>
                        <button className="flex items-center hover:text-pink-400">
                          <Heart className="h-4 w-4 mr-1" />
                        </button>
                        <button className="flex items-center hover:text-blue-400">
                          <BarChart className="h-4 w-4 mr-1" />
                        </button>
                        <button className="flex items-center hover:text-blue-400">
                          <Share className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="border border-gray-800 rounded-lg p-6 bg-gray-900 bg-opacity-40">
                <h3 className="font-bold text-lg mb-4">Prévisions de croissance</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 mx-auto mb-4 text-purple-500" />
                    <p className="text-gray-400">
                      Les statistiques de votre agent seront disponibles après sa création
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sidebar droite */}
      <div className="w-80 p-4 hidden lg:block">
        <div className="sticky top-4">
          <div className="bg-gray-900 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-lg mb-2">Pourquoi un Agent IA?</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span> Présence Twitter 24/7 sans effort
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span> Engagement automatique avec votre audience
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span> Contenu régulier adapté à vos centres d'intérêt
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span> Croissance organique de votre audience
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">Témoignages</h3>
            <div className="space-y-4">
              <div className="text-sm">
                <p className="text-gray-300">
                  "Mon agent IA a augmenté mon engagement de 300% en seulement un mois. Incroyable!"
                </p>
                <p className="text-gray-500 mt-1">- Sophie, Créatrice de contenu</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">
                  "Je peux enfin me concentrer sur la création pendant que mon agent gère les interactions."
                </p>
                <p className="text-gray-500 mt-1">- Thomas, Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
