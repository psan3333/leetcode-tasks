package main

type CustomHeap[T any] struct {
	heap       []T // sorted by timestamp of last tweet
	comparator func(a, b T) int
}

func (h *CustomHeap[T]) parent(index int) int {
	return (index - 1) / 2
}

func (h *CustomHeap[T]) leftChild(index int) int {
	return 2*index + 1
}

func (h *CustomHeap[T]) rightChild(index int) int {
	return 2*index + 2
}

func (h *CustomHeap[T]) swap(i1, i2 int) {
	h.heap[i1], h.heap[i2] = h.heap[i2], h.heap[i1]
}

func (h *CustomHeap[T]) HeapifyUp(index int) {
	for h.parent(index) >= 0 && h.comparator(h.heap[index], h.heap[h.parent(index)]) < 0 {
		h.swap(index, h.parent(index))
		index = h.parent(index)
	}
}

func (h *CustomHeap[T]) HeapifyDown(index int) {
	leftChild := h.leftChild(index)
	rightChild := h.rightChild(index)
	tempIdx := index

	if leftChild < len(h.heap) && h.comparator(h.heap[leftChild], h.heap[tempIdx]) < 0 {
		tempIdx = leftChild
	}
	if rightChild < len(h.heap) && h.comparator(h.heap[rightChild], h.heap[tempIdx]) < 0 {
		tempIdx = rightChild
	}

	if tempIdx != index {
		h.swap(tempIdx, index)
		h.HeapifyDown(tempIdx)
	}
}

func (h *CustomHeap[T]) Insert(value T) {
	h.heap = append(h.heap, value)
	h.HeapifyUp(len(h.heap) - 1)
}

func (h *CustomHeap[T]) PeekHead() T {
	return h.heap[0]
}

func (h *CustomHeap[T]) GetHead() T {
	result := h.heap[0]
	h.swap(0, len(h.heap)-1)
	h.heap = h.heap[:len(h.heap)-1]
	h.HeapifyDown(0)
	return result
}

func (h *CustomHeap[T]) isEmpty() bool {
	return len(h.heap) == 0
}

type Tweet struct {
	postedBy  int
	tweetId   int
	timestamp int
}

type User struct {
	userId       int
	subs         map[int]bool
	postedTweets []Tweet
}

type Twitter struct {
	usersMapping map[int]*User
	currTime     int
}

func Constructor() Twitter {
	return Twitter{
		currTime:     0,
		usersMapping: map[int]*User{},
	}
}

func (this *Twitter) AddUser(userId int) {
	this.usersMapping[userId] = &User{
		userId:       userId,
		subs:         map[int]bool{},
		postedTweets: []Tweet{},
	}
}

func (this *Twitter) PostTweet(userId int, tweetId int) {
	if _, ok := this.usersMapping[userId]; !ok {
		this.AddUser(userId)
	}
	user := this.usersMapping[userId]

	user.postedTweets = append(user.postedTweets, Tweet{
		tweetId:   tweetId,
		timestamp: this.currTime,
		postedBy:  userId,
	})
	this.currTime++
}

func (this *Twitter) GetNewsFeed(userId int) []int {
	if _, ok := this.usersMapping[userId]; !ok {
		return []int{}
	}
	tweetsHeap := CustomHeap[Tweet]{
		comparator: func(a Tweet, b Tweet) int {
			return b.timestamp - a.timestamp
		},
	}

	subs := this.usersMapping[userId].subs
	cntTweetsRecommended := map[int]int{}
	for sub := range subs {
		if user, ok := this.usersMapping[sub]; ok {
			userTweets := len(user.postedTweets)
			if userTweets > 0 {
				cntTweetsRecommended[sub] = userTweets - 1
				tweetsHeap.Insert(user.postedTweets[userTweets-1])
			}
		}
	}
	if len(this.usersMapping[userId].postedTweets) > 0 {
		cntTweetsRecommended[userId] = len(this.usersMapping[userId].postedTweets) - 1
		tweetsHeap.Insert(this.usersMapping[userId].postedTweets[len(this.usersMapping[userId].postedTweets)-1])
	}

	recommendations := []int{}
	for i := 0; i < 10 && !tweetsHeap.isEmpty(); i++ {
		mostRecentTweet := tweetsHeap.GetHead()
		recommendations = append(recommendations, mostRecentTweet.tweetId)
		if cntTweetsRecommended[mostRecentTweet.postedBy] > 0 {
			cntTweetsRecommended[mostRecentTweet.postedBy]--
			tweetsHeap.Insert(
				this.usersMapping[mostRecentTweet.postedBy].postedTweets[cntTweetsRecommended[mostRecentTweet.postedBy]])
		}
	}
	this.currTime++
	return recommendations
}

func (this *Twitter) Follow(followerId int, followeeId int) {
	if _, ok := this.usersMapping[followerId]; !ok {
		this.AddUser(followerId)
	}
	if _, ok := this.usersMapping[followeeId]; !ok {
		this.AddUser(followeeId)
	}
	this.usersMapping[followerId].subs[followeeId] = true
	this.currTime++
}

func (this *Twitter) Unfollow(followerId int, followeeId int) {
	delete(this.usersMapping[followerId].subs, followeeId)
	this.currTime++
}

/**
 * Your Twitter object will be instantiated and called as such:
 * obj := Constructor();
 * obj.PostTweet(userId,tweetId);
 * param_2 := obj.GetNewsFeed(userId);
 * obj.Follow(followerId,followeeId);
 * obj.Unfollow(followerId,followeeId);
 */
