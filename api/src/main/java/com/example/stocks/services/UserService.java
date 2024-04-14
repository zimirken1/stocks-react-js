package com.example.stocks.services;

import com.example.stocks.DTO.UserDTO;
import com.example.stocks.entity.User;
import com.example.stocks.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  public User create(UserDTO dto) {
    User user = User.builder()
        .username(dto.getUsername())
        .password(dto.getPassword())
        .build();
    return userRepository.save(user);
  }

  public List<User> readAll() {
    return userRepository.findAll();
  }

  public User update(User user) {
    return userRepository.save(user);
  }

  public void delete (Long id) {
    userRepository.deleteById(id);
  }
}
