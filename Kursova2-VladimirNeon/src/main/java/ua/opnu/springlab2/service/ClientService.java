package ua.opnu.springlab2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.opnu.springlab2.model.Client;
import ua.opnu.springlab2.repos.ClientRepository;


import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client addClient(Client client) {
        client.setRecommendedCalories(calculateRecommendedCalories(client));
        return clientRepository.save(client);
    }

    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    private double calculateRecommendedCalories(Client client) {
        return 447.6 + (9.2 * client.getWeight()) + (3.1 * client.getHeight()) - (4.3 * client.getAge());
    }
}