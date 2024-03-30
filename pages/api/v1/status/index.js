function status(request, response) {
  response.status(200).json({ chave: "Joinha!" })
}

export default status