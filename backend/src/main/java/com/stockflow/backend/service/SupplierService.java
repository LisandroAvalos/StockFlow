package com.stockflow.backend.service;

import com.stockflow.backend.dto.SupplierRequest;
import com.stockflow.backend.entity.Supplier;
import com.stockflow.backend.exception.ResourceNotFoundException;
import com.stockflow.backend.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierService {

    final SupplierRepository supplierRepository;

    public List<Supplier> getAllSuppliers(){
        return supplierRepository.findByActiveTrue();
    }

    public Supplier getSupplierById(Long id){
        return supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con id: "+id));
    }

    public Supplier getSupplierByName(String name){
        return supplierRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con nombre: "+name));
    }

    public Supplier getSupplierByEmail(String email){
        return supplierRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con email: "+email));
    }

    public Supplier saveSupplier(SupplierRequest supplierRequest){
        Supplier supplier = new Supplier();
        supplier.setName(supplierRequest.getName());
        supplier.setTelephone(supplierRequest.getTelephone());
        supplier.setEmail(supplierRequest.getEmail());

        return supplierRepository.save(supplier);
    }

    public Supplier updateSupplier(Long id, SupplierRequest supplierRequest){
        Supplier supplier = getSupplierById(id);
        supplier.setName(supplierRequest.getName());
        supplier.setTelephone(supplierRequest.getTelephone());
        supplier.setEmail(supplierRequest.getEmail());

        return supplierRepository.save(supplier);
    }

    public Supplier softDeleteById(Long id){
        Supplier supplier = getSupplierById(id);
        supplier.setActive(false);

        return supplierRepository.save(supplier);
    }
}
